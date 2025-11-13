import json
from exiftool import ExifToolHelper
import tempfile
import os
from collections import defaultdict

# exiftool expects a file like object so having to create temporary file from url path
# before passing it to exiftool helper. Also, having to retreive the temp file
# and renaming it so it writes the correct filename into FileName exifdata (FILE).


def get_all_metadata(image_path):
    with ExifToolHelper() as et:
        result = et.execute("-all", image_path, "-g", "-j", "-P", "-s", "-fast")
        json_str = "".join(result)  # join list of strings
        metadata = json.loads(json_str)
        return metadata


def get_all_metadata_text(image_bytes, obj):
    # Temp file creation
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        temp_file.write(image_bytes)
        temp_file.flush()

    # Rename file
    temp_dir = os.path.dirname(temp_file.name)
    new_path = os.path.join(temp_dir, obj.upload_name)
    os.rename(temp_file.name, new_path)

    try:
        with ExifToolHelper() as et:
            result = et.execute("-all", new_path)
    finally:
        os.remove(new_path)  # Clean up renamed file

    return result


# class to handle the extraction of metadata which wraps Exiftool.
# Init can be passed a URL as image_path by setting url to true.
# alos need object to handle generating text output
# args are exiftool commands as strings
class MetaDataHandler:

    def __init__(self, image_path: str | bytes, obj: object = None, *args):
        self.image_path = image_path
        self.obj = obj
        self.args = args

    # method to create and rename temp file to pas to exiftool
    
    def _create_temp_file(self, image_path, obj):
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            if isinstance(image_path, bytes):
                temp_file.write(image_path)
            elif isinstance(image_path, str):
                with open(image_path, "rb") as f:
                    temp_file.write(f.read())
            else:
                raise TypeError("image_path must be bytes or a file path string")
            temp_file.flush()

        temp_dir = os.path.dirname(temp_file.name)
        new_path = os.path.join(temp_dir, obj.upload_name)
        os.rename(temp_file.name, new_path)
        if new_path: 
            print('successfully created temp file')
        else:
            print('error creating temporary file')
        return new_path
    
    
    def get_metadata(self):
        with ExifToolHelper() as et:
            image = self._create_temp_file(self.image_path, self.obj)
            result = et.execute(image, *self.args, "-fast")
            # check if exiftool result is JSON (for Frontend usage)
            if "-j" in self.args:
                json_str = "".join(result)
                metadata = json.loads(json_str)
                os.remove(image)
                return metadata
            else:
                os.remove(image)
                return result
    
    
    def process_metadata(self, data):

        if not isinstance(data, list):
            raise TypeError(f"Data musct be a list not {type(data).__name__}")
        
        if not data or not isinstance(data[0], dict):
            raise ValueError("Data must be a non-empty list containing a dict")
        
        for k, v in data[0].items():
            if type(v) is list:
                data[0][k] = ",".join(str(x) for x in v)
        # Changes the FileName in metadata to match uploaded file name
        if "File:FileName" in data[0]:
            data[0]["File:FileName"] = self.obj.upload_name
        else:
            print("error setting FileName in metadata")
        return data 
    
    def write_metadata(self, image: str | bytes, obj: object, metadata: dict):
    # Create a temporary file for the image
        temp_file = self._create_temp_file(image, obj)
        
        # Create a temporary JSON file to store metadata
        with tempfile.NamedTemporaryFile(delete=False, mode='w', suffix='.json') as json_file:
            json.dump(metadata, json_file)
            json_file_path = json_file.name  # Path to the temporary JSON file

        # Run ExifTool with the metadata JSON file
        with ExifToolHelper() as e:
            result = e.execute(temp_file, f"-json={json_file_path}")
            print(result, "exiftool result")
            
        return temp_file
       



    @staticmethod
    def group_metadata(metadata):
        sorted_metadata = defaultdict(dict)
        for key, value in metadata[0].items():
            try:
                data_type, item = key.split(":")
                sorted_metadata[data_type][item] = value
            except ValueError:
                f"Skipping {key}"
        
        return sorted_metadata
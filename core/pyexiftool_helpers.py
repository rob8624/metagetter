import json
from exiftool import ExifToolHelper
import tempfile

def get_all_metadata(image_path):
    with ExifToolHelper() as et:
        result = et.execute("-all", image_path, "-g", "-j", "-P", "-s", "-fast")
        json_str = ''.join(result)   # join list of strings
        metadata = json.loads(json_str)
        return metadata


def get_all_metadata_text(image_bytes):
    with tempfile.NamedTemporaryFile(suffix=".jpg") as temp_file:
        temp_file.write(image_bytes)
        temp_file.flush()  # Ensure all data is written

        with ExifToolHelper() as et:
            result = et.execute("-all", temp_file.name)
            return result
            
        
        
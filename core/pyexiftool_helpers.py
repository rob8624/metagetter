import json
from exiftool import ExifToolHelper

def get_all_metadata(image_path):
    with ExifToolHelper() as et:
        result = et.execute("-all", image_path, "-g", "-j", )
        json_str = ''.join(result)   # join list of strings
        metadata = json.loads(json_str)
        return metadata

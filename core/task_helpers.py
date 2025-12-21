from core.helper_functions import create_message, handle_task
from core.pyexiftool_helpers import  MetaDataHandler
import io
import requests
import json




class TaskAction:
    def __init__(self, task, obj):
        self.task = task.lower()
        self.obj = obj

    def _handle_metadata(self):
        raw_metadata = self.obj.metadata.data
        sorted_metadata = MetaDataHandler.group_metadata(raw_metadata)
        return sorted_metadata
    
    def text_file(self):
        metadata = self._handle_metadata()
        content_body = handle_task(metadata, self.task)
        content = create_message(self.obj, content_body)
        file = io.BytesIO(content.encode("utf-8"))
        file_name = "metadata.txt"
        file_details = {'file':file, 'file_name':file_name, 'content_type':"text/plain"}
        return file_details
    
    def json_file(self):
        metadata = self._handle_metadata()
        json_string = json.dumps(metadata, indent=2)
        file = io.BytesIO(json_string.encode("utf-8"))
        file_name = "metadata.json"
        
        file_details = {'file':file, 'file_name':file_name, 'content_type':"application/json"}
        return file_details

    
    def delete_data(self):
        image_url = self.obj.image.file.url

        # 1. Download remote image
        try:
            response = requests.get(image_url)
            response.raise_for_status()
            image_bytes = response.content
        except Exception as e:
            raise ValueError(f"Error downloading image: {e}")

        # 2. Delete metadata
        handler = MetaDataHandler(image_bytes, self.obj)
        cleaned_temp_file_path = handler.delete_all_data()

        # 3. Read cleaned file
        with open(cleaned_temp_file_path, "rb") as f:
            cleaned_bytes = f.read()

        cleaned_file = io.BytesIO(cleaned_bytes)

        return {
            "file": cleaned_file,
            "file_name": self.obj.upload_name,
            "content_type": "image/jpg",
            "content-disposition" : "attachment; filename=picture.png"
        }
    

    
    
    
    def handle_task(self): 
        actions = {
            "textfile" : self.text_file,
            "deletedata" : self.delete_data,
            "json" : self.json_file
        }

        if self.task in actions:
            return actions[self.task]()
        else:
            raise ValueError("unknow task")


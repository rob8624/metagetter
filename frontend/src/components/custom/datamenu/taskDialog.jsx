import { useState } from "react";
import { useDataTask } from "../../../services/mutations.jsx";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog.jsx"

import {
 
  MenubarItem,
 
} from "../../ui/menubar.jsx";

const MENUSTRUCTURE = 
          //keys is this objects must match task prop
          {
            "textfile" : 
            { 'menuName' : ".Txt file",
              'menuDescription': "Human readable file", 
              'modalMessage' : "This will return data in a TextFile",
              'buttonMessage' : "as .Txt file"
            },

            "json": 
            {'menuName' : "JSON file",
              'menuDescription' : "For devs and data analysists",
            'modalMessage' : "This will return data in a JSON file",
            'buttonMessage' : "as JSON file"},
            

            "deletedata" : 
            { 'menuName' : "Delete Image Data",
              'menuDescription' : "THIS WILL DELETE ALL DATA FROM IMAGE",
               'modalMessage' : "This delete all your data in the image",
              'buttonMessage' : "and DELETE ALL DATA"}
            }
          

        
 
    





export function TaskDialog({ selectedImage, task}) {
    const metadataTask = useDataTask(task);
    const [isOpen, setIsOpen] = useState(false);

    
    const taskMenu = MENUSTRUCTURE[task.toLowerCase()]

    function handleTask(task) {
    
      return (
          <DialogDescription>
            <div className="flex justify-center">
              {!metadataTask.isSuccess &&
                (
                <button 
                  onClick={(e) =>{
                  e.preventDefault();    
                  metadataTask.mutate(selectedImage)}}
                  disabled={metadataTask.isLoading}
                  className={`p-5 rounded-md border text-black ${task === 'deletedata' ? 'bg-red-400' : 'bg-blue-100'}`}
                >
                  <div className="flex gap-2">
                    <div>{metadataTask.isLoading ? 'Downloading...' : 'Download'}</div>
                    <div>{taskMenu.buttonMessage}</div>
                  </div>
                </button>
                )
                }

                {metadataTask.isLoading && <div>Loading...</div>}
                {metadataTask.isError && (
                  <div className="text-red-500 mt-2">
                    Error: {metadataTask.error?.response?.status || 404} - Endpoint not found
                  </div>
                )}
                {metadataTask.isSuccess && (
                  <>
                  <div className="text-green-500 mt-2">Download Succesffull</div>
                  <button onClick={() => setIsOpen(false)}>Close</button>
                  </>
                )}
              </div>
              </DialogDescription>
      )
    }

    

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <MenubarItem onSelect={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}>
            <div>
              <div className="font-bold">{taskMenu.menuName}</div>
              <div className="text-xs">{taskMenu.menuDescription}</div>
            </div>

          </MenubarItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`${taskMenu.modalMessage}`} from {selectedImage?.upload_name}
              <img src={selectedImage.image_thumbnail_url} alt="iamge"/>
            </DialogTitle>
            {handleTask(task)}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
}
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





export function TaskDialog({selectedImage, task, taskName}) {
    const metadataTask = useDataTask(task);
    const [isOpen, setIsOpen] = useState(false);

    function getTaskDescription(taskname) {
          const task = taskname.toLowerCase()

          const taskDescription = {
            'textfile':"Human readable file",
            'json' : "For devs and data analysists"
          }

          return taskDescription[task]
    }

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <MenubarItem onSelect={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}>
            <div>
              <div className="font-bold">{taskName}</div>
              <div className="text-xs">{getTaskDescription(task)}</div>
            </div>

          </MenubarItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>To {`get data as ${taskName}`} from {selectedImage?.upload_name}</DialogTitle>
            <DialogDescription>
              <button 
                onClick={(e) =>{
                e.preventDefault();    
                metadataTask.mutate(selectedImage)}}
                disabled={metadataTask.isLoading}
              >
                {metadataTask.isLoading ? 'Downloading...' : 'Download'}
              </button>

              {metadataTask.isLoading && <div>Loading...</div>}
              {metadataTask.isError && (
                <div className="text-red-500 mt-2">
                  Error: {metadataTask.error?.response?.status || 404} - Endpoint not found
                </div>
              )}
              {metadataTask.isSuccess && (
                <div className="text-green-500 mt-2">Download started!</div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
}
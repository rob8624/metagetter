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
    
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <MenubarItem onSelect={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}>
            {taskName}
          </MenubarItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>To {`get data as ${taskName}`} from {selectedImage?.upload_name}</DialogTitle>
            <DialogDescription>
              <button 
                onClick={() => metadataTask.mutate(selectedImage)}
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
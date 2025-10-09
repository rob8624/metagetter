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




export function TaskDialog({selectedImage, taskName}) {
    const metadataTask = useDataTask('textFile');
    
    return(
         
                      <Dialog>
                        <DialogTrigger asChild>
                          <MenubarItem onSelect={(e) => e.preventDefault()}>
                            Open Dialog
                          </MenubarItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>To {taskName} data from {selectedImage?.upload_name} click download</DialogTitle>
                            <DialogDescription>
                              <button onClick={() => metadataTask.mutate(selectedImage, 'textFile')}>Download</button>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
    )
}
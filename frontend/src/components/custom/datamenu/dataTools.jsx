
import { useState } from "react";
import { TaskDialog } from "./taskDialog.jsx";
import { Button } from "../../ui/button.jsx"

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger
} from "../../ui/menubar.jsx";



import { Switch } from "../../ui/switch"
import { Label } from "../../ui/label"






export function DataTools({ refs, selectedImage, isEditing, setIsEditing }) {
   const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-1 col-span-full m-2">
        <div className="flex gap-2 items-center">
         <Switch id="data-tools-menu" checked={showMenu} onCheckedChange={(checked) => setShowMenu(checked)} /> 
      
                <Label htmlFor="data-tools-menu" className="text-muted-foreground text-sm"
               >Data Tools Menu</Label>
          
        <div/>
          
        </div>
        { showMenu ?
        <div>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="p-2" onClick={() => setIsEditing(!isEditing)}>{isEditing? 
              <Button variant="destructive">Cancel</Button> : 
            <Button variant="outline">Edit Data</Button>}</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu ref={el => refs.current.dataMenu = el}>
            <MenubarTrigger>
              <Button variant="outline">Download/Delete</Button>
              </MenubarTrigger>
            <MenubarContent>
              <MenubarSub >
                <MenubarSubTrigger>Download Data</MenubarSubTrigger>
                <MenubarSubContent>
                  <TaskDialog selectedImage={selectedImage} taskName={".txt"} task={'textFile'}/>
                  <TaskDialog selectedImage={selectedImage} taskName={"JSON"} task={'json'}/>
                  <TaskDialog selectedImage={selectedImage} taskName={"XMP"} task={'xmp'}/>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSub >
                 <MenubarSubTrigger>Delete Data</MenubarSubTrigger>
            <MenubarSubContent>
              
                 <TaskDialog selectedImage={selectedImage} taskName={"DeleteAllData"} task={'deletedata'}/>
              
            </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        </Menubar> 
        </div> : null}
        
      </div>
    </>
  );
}
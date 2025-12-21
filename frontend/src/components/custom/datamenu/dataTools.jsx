

import { TaskDialog } from "./taskDialog.jsx";
import { Button } from "../../ui/button.jsx"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger
} from "../../ui/menubar.jsx";







export function DataTools({ refs, selectedImage, isEditing, setIsEditing }) {
  return (
    <>
      <div className="flex flex-col col-span-full m-2">
        <div className="text-sm">Data menu</div>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger onClick={() => setIsEditing(!isEditing)}>{isEditing? 
              <Button variant="destructive">Cancel</Button> : 
            <Button>Edit Data</Button>}</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu ref={el => refs.current.dataMenu = el}>
            <MenubarTrigger>Download</MenubarTrigger>
            <MenubarContent>
              <MenubarSub >
                <MenubarSubTrigger>Download Data</MenubarSubTrigger>
                <MenubarSubContent>
                  <TaskDialog selectedImage={selectedImage} taskName={".txt"} task={'textFile'}/>
                  <TaskDialog selectedImage={selectedImage} taskName={"JSON"} task={'json'}/>
                  <MenubarItem>CSV</MenubarItem>
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
      </div>
    </>
  );
}
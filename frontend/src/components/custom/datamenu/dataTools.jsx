

import { TaskDialog } from "./taskDialog.jsx";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../../ui/menubar.jsx";




export function DataTools({ refs, selectedImage, isEditing, setIsEditing }) {
  return (
    <>
      <div className="flex flex-col col-span-full m-2">
        <div className="text-sm">Data menu</div>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger onClick={() => setIsEditing(!isEditing)}>{isEditing? 'Cancel' : 'Edit'}</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu ref={el => refs.current.dataMenu = el}>
            <MenubarTrigger>Download</MenubarTrigger>
            <MenubarContent>
              <TaskDialog selectedImage={selectedImage} taskName={".txt"} task={'textFile'}/>
              <TaskDialog selectedImage={selectedImage} taskName={"JSON"} task={'JSON'}/>
              <MenubarItem>CSV</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  );
}
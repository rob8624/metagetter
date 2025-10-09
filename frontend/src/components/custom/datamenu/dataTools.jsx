

import { TaskDialog } from "./taskDialog.jsx";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../../ui/menubar.jsx";




export function DataTools({ refs, selectedImage }) {
  return (
    <>
      <div className="flex flex-col col-span-full m-2">
        <div className="text-sm">Data menu</div>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu ref={el => refs.current.dataMenu = el}>
            <MenubarTrigger>Download</MenubarTrigger>
            <MenubarContent>
              {/* ✅ Dialog directly inside MenubarContent */}
              <TaskDialog selectedImage={selectedImage} taskName={"get as .txt file"} task={"generateTextFile"} />
              <MenubarItem>CSV</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  );
}
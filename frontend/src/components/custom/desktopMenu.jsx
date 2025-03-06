import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

export default function DesktopMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="">About</NavigationMenuTrigger>
          <NavigationMenuContent>
           
              <div className="grid grid-cols-[repeat(2,auto)] auto-rows-auto gap-2 w-[300px] p-2">
                <div className="col-span-2 text-xl">
                  <h1 className="font-bold">Metagetter</h1>
                </div>
                <span className="text-sm leading-tight">
                  A tool to view, edit and save file metadata. Harnesing the
                  pwer of Exiftool, Metagetter enables you take control of the
                  hidden dta within files.
                </span>
                <div className="text-sm leading-tight">
                  MetaGetter will help <span className="font-bold">improve SEO, add authenticity to AI
                  images, help catalog and label images</span>.
                </div>
                <hr className="col-span-2"></hr>
                <h2 className="col-span-2 text-lg font-bold">MetaGetter Functionalities</h2>
                <div className="text-sm leading-tight col-span-2">
                  MetaGetter lets you view and edit all exifdata fields available and all data types,
                  incluing XMP (PhotoMechanic) IPTC (PHOTOSHOP).
                </div>
                
              </div>
            
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="">Use</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-5 w-[300px]">
              <h1>Upload images(s)</h1>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="">Donate</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-5 w-[300px]">
              <h1>Upload images(s)</h1>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

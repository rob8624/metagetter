import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    
    NavigationMenuItem,
    
    NavigationMenuList,
    NavigationMenuTrigger,
   
  } from "../ui/navigation-menu"

const Header = () => {
  
  return (
  <div className='flex flex-row justify-center'> 
    <div className="flex flex-col items-center gap-5">
        <div className="text-6xl text-sky-600 ">MetaGetter</div>
            <div>
                <NavigationMenu >
                    <NavigationMenuList>
                        <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-slate-100">About</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                <div className="grid grid-cols-[repeat(2,auto)]">
                                    <div className="col-span-1 text-xl p-5">
                                        <h1 className="font-bold pb-5">Metagetter</h1>
                                        <span className="text-sm text-center">
                                            A tool to view, edit and save file metadata
                                        </span>
                                    </div>
                                    <div className="col-span-1">asdsadasd</div>
                                    
                                </div>
                                </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-slate-100">Use</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="p-10">
                                    Upload images(s)
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
     </div>
  </div>
 )
}

export default Header
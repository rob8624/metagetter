import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
   
  } from "../ui/navigation-menu"

const Header = () => {
  
  return (
  <div className='flex flex-row justify-center'> 
    <div className="flex flex-col">
        <h1>MetaGetter</h1>
            <div>
                <NavigationMenu >
                    <NavigationMenuList>
                        <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-slate-300">About</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <h1>Welcome to MetaGetter</h1>
                                <NavigationMenuLink>About</NavigationMenuLink>
                                <NavigationMenuLink>Usage</NavigationMenuLink>
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
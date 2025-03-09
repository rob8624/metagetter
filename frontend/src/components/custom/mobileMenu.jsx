import React from 'react'

import { Drawer,
  
    DrawerContent,
    
   
    DrawerTrigger, } from '../ui/drawer'
import DesktopMenu from './desktopMenu.jsx'

export default function MobileMenu () {
        return(
            <Drawer>
  <DrawerTrigger>Menu</DrawerTrigger>
  <DrawerContent >
    <div className="flex  justify-center pb-10">
        <DesktopMenu/>
    </div>
  </DrawerContent>
</Drawer>
        )
}
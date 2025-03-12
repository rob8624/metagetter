import React from 'react'

import { Drawer,
    DrawerContent,
    DrawerTrigger, } from '../ui/drawer'
import DesktopMenu from './desktopMenu.jsx'

export default function MobileMenu () {

  


        return(
  <Drawer>
    <DrawerTrigger>
    <img className="h-10 m-2 rounded-md opacity-50" alt="Logo" />
    </DrawerTrigger>
    <DrawerContent >
      <div className="flex  justify-center pb-10">
          <DesktopMenu/>
      </div>
    </DrawerContent>
</Drawer>
        )
}
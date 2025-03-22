import React from 'react'
import { useContext } from 'react'

import  { ThemeContext }  from '../../context/darkModeContext'

import { Drawer,
    DrawerContent,
    DrawerTrigger,
     } from '../ui/drawer'
import DesktopMenu from './desktopMenu.jsx'

export default function MobileMenu () {

const { darkMode } = useContext(ThemeContext)


return(
  <Drawer>
    <DrawerTrigger>
    <img 
      className="h-12 m-2 rounded-md"
      src={darkMode ? "/header/burger-menu-dark.png" : "/header/burger-menu.png"} 
      alt="Hamburger-Logo" 
      />
    
    
    </DrawerTrigger>
    <DrawerContent >
      <div className="flex  justify-center pb-10">
      
          <DesktopMenu/>
      
      </div>
    </DrawerContent>
</Drawer>
        )
}
import React from "react";
import {useMediaQuery } from '@react-hook/media-query'
import DesktopMenu from "../custom/desktopMenu";
import MobileMenu from "../custom/mobileMenu";

import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";





const Header = () => {

  const [dark, setDark] = React.useState(false)

  const matches = useMediaQuery('only screen and (min-width: 600px)')

  const handleDarkModeToggle = () => {
    setDark(!dark)
    document.body.classList.toggle("dark")
  }
  
  
  return (
  <div className='flex flex-row sm:justify-center dark:bg-black'> 
    <div className="flex w-screen sm:flex-col items-center justify-between sm:gap-5">
        <div className=" text-4xl sm:text-6xl text-sky-600">
            <img className="h-14 sm:h-32 m-2 rounded-md opacity-90 bg-black"src="/HeaderLogo.png" alt="Logo" />
            
        </div>
            <div>
              
                {matches ? <DesktopMenu/> : <MobileMenu/> }
            </div>
     </div>
    <button onClick={() => handleDarkModeToggle()} className="self-start">
      {dark ? < MdOutlineDarkMode size={'2em'}/> : <MdDarkMode size={'2em'}/> }
    </button>
  </div>
 )
}

export default Header
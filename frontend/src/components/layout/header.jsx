import React from "react";
import {useMediaQuery } from '@react-hook/media-query'

import DesktopMenu from "../custom/desktopMenu";
import MobileMenu from "../custom/mobileMenu";


const Header = () => {

  const matches = useMediaQuery('only screen and (min-width: 600px)')
  
  return (
  <div className='flex flex-row sm:justify-center'> 
    <div className="flex sm:flex-col items-center sm:gap-5">
        <div className=" text-4xl sm:text-6xl text-sky-600">
            <img className="h-14 sm:h-32 m-2 rounded-md bg-black"src="/HeaderLogo.png" alt="Logo" />
        </div>
            <div>
                {matches ? <DesktopMenu/> : <MobileMenu/> }
            </div>
     </div>
  </div>
 )
}

export default Header
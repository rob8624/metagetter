import React from "react";

import DesktopMenu from "../custom/desktopMenu";


const Header = () => {
  
  return (
  <div className='flex flex-row justify-center'> 
    <div className="flex flex-col items-center gap-5">
        <div className="text-6xl text-sky-600 ">MetaGetter</div>
            <div>
                <DesktopMenu/>
            </div>
     </div>
  </div>
 )
}

export default Header
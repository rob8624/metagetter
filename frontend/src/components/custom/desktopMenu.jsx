import React from "react";
import { useEffect, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
  
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";


import ProfileSheet from "./profileSlider";

import {useMediaQuery } from '@react-hook/media-query'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


//context
import { UseMenuData } from "../../context/menuData";
import { UseLoggedIn } from "../../context/userContext";

//components
import Logout from "./logout";



//ABOUT AND USAGE MENUS COMMENTED OUT FOR THE MOMENT 
export default function DesktopMenu() {


  const [ isOpen, setIsOpen ] = useState(false)
  const matches = useMediaQuery('only screen and (min-width: 600px)')
  const menuData = UseMenuData()
  const { loggedIn, setLoggedIn } = UseLoggedIn();
 
  useEffect(() => {
    const token = localStorage.getItem('a_t');
    if (token) {
      setLoggedIn(true);
     
      
    } else {
      setLoggedIn(false);
     
    }
  }, [setLoggedIn]); 
  
  
  const { pathname } = useLocation()
  
  
  const topDropdownStyles = `
  [&>div.absolute]:bottom-full 
  [&>div.absolute]:top-auto 
  [&>div.absolute>*]:mb-1.5 
  [&>div.absolute>*]:mt-0
  [&>div.absolute>*]:origin-bottom-center
`;

const navMenuClassName = !matches && pathname !== '/viewer/' ? topDropdownStyles : '';

let navigate = useNavigate();




  return (
    <>
    <div className="flex">
    <NavigationMenu className={`${navMenuClassName} bg-transparent [&_button]:px-4 [&_button]:py-2 [&_button]:bg-white/10 [&_button]:backdrop-blur-sm [&_button]:rounded-lg [&_button]:border [&_button]:border-white/20 [&_button]:hover:bg-white/20`}>
    {menuData.map((item, index) => (
      <NavigationMenuList key={index}>
        
        { loggedIn ? null : 
        item.signinContent.map((item, index) => (
          <React.Fragment key={index}>
     
        <NavigationMenuItem>
        <button
          onClick={() => navigate('/signin', { replace: true})}
          
          className={navigationMenuTriggerStyle()}>
          <div className="text-black dark:text-white">{item.Label}</div>
        </button>
      </NavigationMenuItem>
    
        </React.Fragment>
        )) 
        }
       
       
      </NavigationMenuList>
     ))}
    </NavigationMenu>
    
    { loggedIn ?
    <NavigationMenu className={navMenuClassName}>
      <NavigationMenuList >
       <NavigationMenuItem>
          <NavigationMenuTrigger className="text-black dark:text-white">User Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul>
              <li className="pb-1 text-xs">
                <NavigationMenuItem className={navigationMenuTriggerStyle()}>
                  <NavigationMenuLink asChild>
                 <Link to={"/dashboard"}> 
                    Dashboard
                 </Link>
                 </NavigationMenuLink>
                </NavigationMenuItem>
              </li>
              <li className="pb-1">
                <NavigationMenuItem className={navigationMenuTriggerStyle()} onClick={() => {setIsOpen(true)}}>
                  <NavigationMenuLink asChild>
                    <ProfileSheet isOpen={isOpen} setIsOpen={setIsOpen} />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </li>
              <li className="pb-1">
                 <NavigationMenuItem className={navigationMenuTriggerStyle()}>
                  <NavigationMenuLink asChild>
                    <Link to="/">
                        Home
                    </Link>
                   </NavigationMenuLink>
                 </NavigationMenuItem>
              </li>
              <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink asChild>
                
                  <Logout/>
               </NavigationMenuLink> 
                
              </NavigationMenuItem>
            </ul>
            
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu> : null
    }
   </div>
   </>
  );
}
import React from "react";
import { useEffect, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
 
  
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

import ProfileSheet from "./profileSlider";

import {useMediaQuery } from '@react-hook/media-query'
import { Link } from 'react-router-dom';


//context
import { UseMenuData } from "../../context/menuData";
import { UseLoggedIn } from "../../context/userContext";

//components
import Logout from "./logout";




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
  }, [setLoggedIn]); // Empty dependency array ensures it runs only once
  
  

  
  
  const topDropdownStyles = `
  [&>div.absolute]:bottom-full 
  [&>div.absolute]:top-auto 
  [&>div.absolute>*]:mb-1.5 
  [&>div.absolute>*]:mt-0
  [&>div.absolute>*]:origin-bottom-center
`;

const navMenuClassName = matches ? '' : topDropdownStyles;




  return (
    <>
    <div className="flex">
    <NavigationMenu className={navMenuClassName}>
    {menuData.map((item, index) => (
      <NavigationMenuList key={index}>
        <NavigationMenuItem>
          {item.aboutContent && item.aboutContent.map((item, index) => (   
            <React.Fragment key={index}>
          <NavigationMenuTrigger>{item.Label}</NavigationMenuTrigger>
          <NavigationMenuContent>
            
              <div className="grid grid-cols-[repeat(2,auto)] auto-rows-auto gap-2 w-[300px] p-2">
                <div className="col-span-2 text-xl">
                  <h1 className="font-bold" >{item.title}</h1>
                </div>
                <span  className="text-sm leading-tight">
                  {item.firstText}
                </span>
                <div  className="text-sm leading-tight">
                  {item.subText}
                </div>
                <hr className="col-span-2"></hr>
                <h2  className="col-span-2 text-lg font-bold">{item.secondTitle}</h2>
                <div className="text-sm leading-tight col-span-2">
                  {item.secondText}
                </div>
             </div>
          </NavigationMenuContent>
          </React.Fragment>
          ))}
        </NavigationMenuItem>
      
        {item.usageContent && item.usageContent.map((item, index) => (
          <React.Fragment key={index}>
        <NavigationMenuItem >
          <NavigationMenuTrigger className="">{item.Label}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-5 w-[300px]">
              <h1>{item.text}</h1>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        </React.Fragment>
        ))}
        { loggedIn ? null : 
        item.signinContent.map((item, index) => (
          <React.Fragment key={index}>
     
        <NavigationMenuItem>
        <Link 
          to={item.path} 
          className={navigationMenuTriggerStyle()}>
          {item.Label}
        </Link>
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
          <NavigationMenuTrigger>User Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul>
              <li className="p-2 text-xs">
                <NavigationMenuItem className={navigationMenuTriggerStyle()}>
                 <Link to={"/dashboard"}> 
                    Dashboard
                 </Link>
                </NavigationMenuItem>
              </li>
              <li className="p-2">
                <NavigationMenuItem className={navigationMenuTriggerStyle()} onClick={() => {setIsOpen(true)}}>
                    <ProfileSheet isOpen={isOpen} setIsOpen={setIsOpen} />
                </NavigationMenuItem>
              </li>
              <li className="p-2">
                 <NavigationMenuItem className={navigationMenuTriggerStyle()}>
                   <Link to="/">
                      Home
                   </Link>
                 </NavigationMenuItem>
              </li>
              <li className="p-2">
                <Logout/>
              </li>
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

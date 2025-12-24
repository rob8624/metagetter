import React from "react";
import { useContext } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import DesktopMenu from "../custom/desktopMenu";
import MobileMenu from "../custom/mobileMenu";
import { ThemeContext } from "../../context/darkModeContext";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Header = () => {
  const { darkMode, handleDarkModeToggle } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const matches = useMediaQuery("only screen and (min-width: 600px)");

  //array to handle paths where I dont want darkmode button
  const darkModeBtnOff = ["/", "/signin"]


  const handleLogoClick = (e) => {
    if (useLocation.pathname === 'viewer' || location.pathname.includes('/viewer')) {
      e.preventDefault();
      const confirmed = window.confirm('Navigating away will lose all unsaved data. Continue?');
      if (confirmed) {
        navigate('/');
      }
    }
  }
  
  function DarkModeButton() {
    
       if (darkModeBtnOff.includes(location.pathname)) return
       
       
       return(<button id="dark-mode-button" onClick={handleDarkModeToggle}>
            {darkMode ? (
              <MdOutlineDarkMode size={"2em"} className="bg-white rounded-2xl" />
            ) : (
              <MdDarkMode size={"2em"} />
              
            )}
          </button>)
    
  }
  
  
  
  return (
    <>
      <div className={`flex flex-row sm:justify-center dark:bg-black sticky top-0 z-50 bg-transparent mb-2  
        ${location.pathname === '/' || location.pathname === '/signin' ? '' : ' shadow-sm bg-gradient-to-b from-slate-300 to-transparent'}`}>
        <div className="flex w-screen sm:flex-col items-center justify-between sm:gap-5">
          <Link to="/" className="">
            <img
              className="h-14 sm:h-32 m-2 rounded-md opacity-90 bg-black"
              src="/HeaderLogo.png"
              alt="Logo"
              onClick={handleLogoClick}/>
          </Link>
         <DarkModeButton/>
          <div className="pb-2">{matches ? <DesktopMenu /> : <MobileMenu />}</div>
        </div>
      </div>
    </>
  );
};

export default Header;

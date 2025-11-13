import React from "react";
import { useContext } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import DesktopMenu from "../custom/desktopMenu";
import MobileMenu from "../custom/mobileMenu";
import { ThemeContext } from "../../context/darkModeContext";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";


const Header = () => {
  const { darkMode, handleDarkModeToggle } = useContext(ThemeContext);

  const matches = useMediaQuery("only screen and (min-width: 600px)");
  

  return (
    <>
      <div className="flex flex-row sm:justify-center dark:bg-black sticky top-0 z-50 bg-white">
        <div className="flex w-screen sm:flex-col items-center justify-between sm:gap-5">
          <Link to="/" className="">
            <img
              className="h-14 sm:h-32 m-2 rounded-md opacity-90 bg-black"
              src="/HeaderLogo.png"
              alt="Logo"
            />
          </Link>
          <button onClick={handleDarkModeToggle}>
            {darkMode ? (
              <MdOutlineDarkMode size={"2em"} />
            ) : (
              <MdDarkMode size={"2em"} />
            )}
          </button>
          <div>{matches ? <DesktopMenu /> : <MobileMenu />}</div>
        </div>
      </div>
    </>
  );
};

export default Header;

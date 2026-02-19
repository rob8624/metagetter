import { useEffect, useContext } from "react";
import {useMediaQuery } from '@react-hook/media-query'
import { useRef } from "react";
import PageGridTitle from "./PageGridTitle";
import { Button } from "../ui/button";
import DesktopMenu from "../../components/custom/desktopMenu";
import { ThemeContext } from "../../context/darkModeContext";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { Link } from "react-router";



export default function TopBar({
  selectedImage,
  setSelectedImage,
  data,
  sectionRefs,
  isEditing,
  imagesRef
}) {
  const filenameRef = useRef(null);
  const matches = useMediaQuery('only screen and (min-width: 600px)')
  const { darkMode, handleDarkModeToggle } = useContext(ThemeContext);

  useEffect(() => {
    if (selectedImage && filenameRef.current) {
      const element = filenameRef.current;
      element.classList.remove("move-from-left");
      void element.offsetWidth;
      element.classList.add("move-from-left");
    }
  }, [selectedImage]);

  const sectionKeys =
    selectedImage && data
      ? Object.keys(
          data.find((item) => item.id === selectedImage.id)?.grouped_metadata ||
            {}
        )
      : [];

  const scrollToSection = (key) => {
    sectionRefs.current[key]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      container : "nearest"
    });
  };

  const scrollToTop = () => {
    imagesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const UploadButton = () => {
    return (
      <div className="pr-2 ml-auto no-slash">
      <Button variant="outline" size="xs" className=" p-1">
        <Link to={'/upload'}>Upload</Link>
      </Button>
      </div>
    )
  }

  return (
    <div
      id="topbar"
      className={`flex items-center h-fit z-10 shadow-md border-2 rounded-2xl ${selectedImage ? "border-t-2": null} border-gray-400 text-black dark:text-white dark:bg-black`}
      >
        <div className="z-10"><DesktopMenu /></div>
        <button onClick={handleDarkModeToggle} className="pr-1">
           {darkMode ? (
                        <MdOutlineDarkMode size={"2em"} className="bg-black rounded-2xl" />
                      ) : (
                        <MdDarkMode size={"2em"} />
                        
                      )}
        </button>
      {matches ?  <PageGridTitle
        className="pt-5 text-black dark:text-white"
        title={"Viewer"}
        descripition={"Here you can view and edit your data"}
        subDescription={"Select an image to view options"}
        color={"grey"}
      />: null}
      <div id="topbarmenu-wrapper" className="flex-1 ml-2 h-full ">
        <div id="topbarmenu" className="flex flex-wrap sm:gap-2 items-center justify-start h-full overflow-hidden">
         {selectedImage ? (
  <>
    <Button
      variant="outline"
      className="text-xs p-2"
      onClick={() => setSelectedImage(null)}
    >
      Reset
    </Button>
    <div className="text-xs sm:text-sm font-bold">Filename</div>
    <div ref={filenameRef} className="move-from-left text-xs sm:text-sm">
      {selectedImage?.upload_name}
    </div>
   
    {isEditing ? (
      <>
        {null}
      </>
    ) : (
      <>
        {/* Buttons shown when NOT editing */}
        <div className="text-xs sm:text-sm font-bold grow-0 ">Scroll to:</div>
        
        <button onClick={() => scrollToTop()} className="bg-black text-white dark:bg-white
         dark:text-black p-2 rounded-sm">TOP</button>
        
        {sectionKeys.map((key) => (
          <Button key={key} onClick={() => scrollToSection(key)} variant="outline" size="sm"
          className="m-1 p-0 sm:m-2">
            {key}
          </Button>
          
        ))}
        <UploadButton/>
      </>
    )}
    
  </>

) : 
<>
<span className="text-xs">Select an image to view data and access data menu where you can edit and download metadata</span> 
<UploadButton/></>}
        </div>
      </div>
    </div>
  );
}
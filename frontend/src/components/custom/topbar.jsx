import { useEffect } from "react";
import {useMediaQuery } from '@react-hook/media-query'
import { useRef } from "react";
import PageGridTitle from "./PageGridTitle";
import { Button } from "../ui/button";


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
    });
  };

  const scrollToTop = () => {
    imagesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div
      id="topbar"
      className={`mb-2 sticky top-0 z-10 bg-white border-b-2 ${selectedImage ? "border-t-2": null} border-black text-black dark:text-white dark:bg-black`}
    >
      {matches ?  <PageGridTitle
        className="pt-5 text-black dark:text-white"
        title={"Viewer"}
        descripition={"Here you can view and edit your data"}
        subDescription={"Select an image to view options"}
        color={"grey"}
      />: null}
      <div id="topbarmenu-wrapper" className="inline-block ml-2 ">
        <div id="topbarmenu" className="flex flex-wrap gap-2 items-center">
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
        <div className="text-xs sm:text-sm font-bold ">Scroll to:</div>
        
        <button onClick={() => scrollToTop()} className="bg-black text-white dark:bg-white
         dark:text-black p-2 rounded-sm">TOP</button>
        
        {sectionKeys.map((key) => (
          <Button key={key} onClick={() => scrollToSection(key)} variant="outline" size="sm"
          className="m-1 sm:m-2">
            {key}
          </Button>
          
        ))}
        
      </>
    )}
  </>
) : <span className="text-xs">Select an image to view data and access data menu where you can edit and download metadata</span>}
        </div>
      </div>
    </div>
  );
}
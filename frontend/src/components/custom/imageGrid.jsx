import { useState, useRef, useEffect } from "react";

//components 
import GridView from "./gridView";
import SlideshowView from "./slideShowView";

import { Button } from "../ui/button";






// Main ImageGrid Component




export default function ImageGrid({ data }) {
  //state
  const [gridView, setGridView] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images] = useState(data);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  






  //refs object used to not add click event to menu and image
  const refs = useRef({image:null, menu:null, dataSection:null, summary:null})
  
  

useEffect(() => {
  if (!selectedImage) return;

  const handleOutsideClick = (e) => {
    console.log('outside click');
    
    // Get the current refs
    const { image, menu, dataSection, summary, dataMenu } = refs.current;
    
    // Check if click is inside any of your refs
    const isInsideImage = image && image.contains(e.target);
    const isInsideMenu = menu && menu.contains(e.target);
    const isInsideData = dataSection && dataSection.contains(e.target);
    const isInsideSummary = summary && summary.contains(e.target);
    const isInsideDataMenu = dataMenu && dataMenu.contains(e.target);
    
    //Check if click is inside a shadcn portal
    const isInsidePortal = 
      e.target.closest('[data-radix-popper-content-wrapper]') ||
      e.target.closest('[data-radix-portal]') ||
      e.target.closest('[role="dialog"]') ||
      e.target.closest('[role="menu"]') ||
      e.target.closest('[role="listbox"]');

    // Only close if click is truly outside everything
    if (!isInsideImage && !isInsideMenu && !isInsideData && 
        !isInsideSummary && !isInsideDataMenu && !isInsidePortal) {
      setSelectedImage(null);
    }
  };

  const timer = setTimeout(() => {
    window.addEventListener("click", handleOutsideClick);
  }, 0);

  return () => {
    window.removeEventListener("click", handleOutsideClick);
    clearTimeout(timer);
  };
}, [selectedImage]);

const handleImageClick = (item) => {
  setSelectedImage(item);
  console.log(selectedImage, 'selectedimage') // This will trigger useEffect cleanup + setup
};
  


  //checking if data if not return empty message
  if (!data || data.length === 0) {
    return <div className="flex flex-col items-center justify-center h-52">
      <div>No images uploaded</div>
      <div>Goto dashboard and use upload option</div>
    </div>; 
  }
    
  const getMetadata = (metadata) => {
    const entries = Object.entries(metadata?.data?.[0] || {});
    return entries.map(([key, value]) => (
      <div key={key} className="mb-2">
        <span className="font-semibold">{key}:</span>{' '}
        {typeof value === 'object' ? JSON.stringify(value) : value}
      </div>
    ));
  };


  
 
  return (
    <>
    
      <div className="mb-4 flex gap-2">
        <Button
          onClick={() => setGridView(!gridView)}
          className="px-4 py-2 text-white rounded hover:bg-white
           hover:text-black
            hover:border-black hover:border mt-5"
        >
          {gridView ? 'Comparision view' : 'Grid View'}
        </Button>
      </div>
     
      { gridView ? (
        <GridView 
          data={images}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          onImageClick={handleImageClick}
          getMetadata={getMetadata}
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          refs={refs}
          imageToDelete={imageToDelete}
          setImageToDelete={setImageToDelete}
          showPanel={showPanel}   
          setShowPanel={setShowPanel}
        />
      ) : (
        <SlideshowView 
          data={images}
          onImageClick={handleImageClick}
          
          getMetadata={getMetadata}
        />
      )} 
     
    </>
  );
}
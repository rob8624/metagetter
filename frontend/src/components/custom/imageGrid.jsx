import { useState, useRef } from "react";

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
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  //refs
  const menuRef = useRef(null)
  
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

  
  
  //function to handle the click event outside of the selcted 
  //image to unselect it on window click
  //menuRef.current.contains(e.target): Checks if the clicked element (e.target) is inside the menu element
  const handleImageClick = (item) => {
  setSelectedImage(item);

  const handleOutsideClick = (e) => {
    
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setSelectedImage(null);
      window.removeEventListener("click", handleOutsideClick);
    }
  };

  setTimeout(() => {
    window.addEventListener("click", handleOutsideClick);
  }, 0);
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
          onImageClick={handleImageClick}
          getMetadata={getMetadata}
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          menyRef={menuRef}
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
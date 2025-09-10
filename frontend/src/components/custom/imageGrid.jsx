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
  






  //refs used to not add click event to menu and image
  const menuRef = useRef(null)
  const imageRef = useRef(null)


  //useEffect handling outside click of images
  useEffect(() => {
  if (!selectedImage) return;

  const handleOutsideClick = (e) => {
    console.log('outside click');
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setSelectedImage(null);
    }
  };

  const timer = setTimeout(() => {
    window.addEventListener("click", handleOutsideClick);
  }, 0);

  // This cleanup runs when selectedImage changes or component unmounts
  return () => {
    window.removeEventListener("click", handleOutsideClick);
    clearTimeout(timer);
  };
}, [selectedImage]); // Re-run when selectedImage changes

const handleImageClick = (item) => {
  setSelectedImage(item); // This will trigger useEffect cleanup + setup
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
          menuRef={menuRef}
          imageRef={imageRef}
          imageToDelete={imageToDelete}
          setImageToDelete={setImageToDelete}
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
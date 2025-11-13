import { useState, useRef, } from "react";

//components 
import GridView from "./gridView";









// Main ImageGrid Component




export default function ImageGrid({ data, selectedImage, setSelectedImage }) {
  //state
  
  
  const [images] = useState(data);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [isEditing, setIsEditing] = useState(false)  






  //refs object used to not add click event to menu and image
  const refs = useRef({image:null, menu:null, dataSection:null, summary:null})
  
  


const handleImageClick = (item) => {
  setSelectedImage(item);
  
  console.log(selectedImage, 'selectedimage data') // This will trigger useEffect cleanup + setup
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
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
    
        
      
     
    </>
  );
}
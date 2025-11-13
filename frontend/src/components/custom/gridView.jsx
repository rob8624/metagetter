import { useState } from "react";




import MetadataPanel from "./metadataPanel";
import { EditForm } from "./editing/editForm";
import ImageCard from "./imageCard";
import DetailPanel from "./detailPanel";
import { DataTools } from "./datamenu/dataTools";




// Grid View Component
const GridView = ({ 
  data, 
  selectedImage, 
  setSelectedImage,
  onImageClick, 
  onDelete, 
  getMetadata,
  confirmDelete,
  setConfirmDelete,
  refs, 
  imageToDelete,
  setImageToDelete,
  showPanel,
  setShowPanel,
  isEditing,
  setIsEditing
}) => {

const [openDropdownId, setOpenDropdownId] = useState(null);


  
 
  

  return (
    <>
    <div className="mx-auto flex flex-col min-h-0  justify-center items-center sm:justify-start sm:items-start max-w-screen-sm sm:flex-row w-full sm:max-w-6xl gap-4"
    ref={el => refs.current.summary = el}>
      {/* Images Grid - Left Side */}
      

      <div className="grid grid-cols-1 gap-4">
        
        
      
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-lg backdrop-blur-xl sm:p-10   bg-white
        ">
        
          {data.map((item) => (
            
            
            <ImageCard
              key={item.id}
              item={item}
              confirmDelete={confirmDelete}
              setConfirmDelete={setConfirmDelete}
              isSelected={selectedImage?.id === item.id}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              onImageClick={onImageClick}
              onDelete={onDelete}
              showTools={true}
              refs={refs}
              imageToDelete={imageToDelete}
              setImageToDelete={setImageToDelete}
              openDropdownId={openDropdownId}
              setOpenDropdownId={setOpenDropdownId}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
         
          ))}

          {selectedImage ? <DataTools selectedImage={selectedImage} isEditing={isEditing} setIsEditing={setIsEditing}/> : null}
          
        </div>
       
       
        
          <div className="m-2 bg-gray-50 sticky border rounded-md p-4 h-fit order-1 sm:order-2 block sm:hidden">
            <MetadataPanel 
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage} 
              getMetadata={getMetadata} 
              data={data}
              showPanel={showPanel}
              setShowPanel={setShowPanel}
            /> </div>
        
        
        <div className="w-screen sm:w-full order-2 sm:order-1 border-2 border-black p-2 rounded-lg" 
        ref={el => refs.current.dataSection = el}>
          {isEditing ? <EditForm data={data} selectedImage={selectedImage}/> :
          <DetailPanel selectedImage={selectedImage} data={data} 
          setSelectedImage={setSelectedImage}/> 
        } 
          
        </div>
      </div>
      


      {/* Metadata Panel - Right Side */}
      
      
      <div className="w-80 bg-gray-50 border rounded-md p-4 h-fit sticky top-10 order-1 sm:order-2 hidden sm:block">
        <MetadataPanel 
          selectedImage={selectedImage} 
          getMetadata={getMetadata} 
          data={data}
          showPanel={showPanel}
          setShowPanel={setShowPanel}
        />
      </div> 
     
          
    </div>
    
    
    </>
  );
};


export default GridView
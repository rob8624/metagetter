import MetadataPanel from "./metadataPanel";
import ImageCard from "./imageCard";
import DetailPanel from "./detailPanel";

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
  menuRef,
  imageRef,
  imageToDelete,
  setImageToDelete

}) => {
  return (
    <>
    <div className="flex flex-col sm:flex-row w-full max-w-6xl gap-4">
      {/* Images Grid - Left Side */}
      <div className="flex-1 flex-col">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              menuRef={menuRef}
              imageRef={imageRef}
              imageToDelete={imageToDelete}
              setImageToDelete={setImageToDelete}
            />
          ))}
        </div>
        <div>
          <DetailPanel selectedImage={selectedImage} data={data}/>
        </div>
        
      </div>
      


      {/* Metadata Panel - Right Side */}
      <div className="w-80 bg-gray-50 border rounded-md p-4 h-fit">
        <MetadataPanel 
          selectedImage={selectedImage} 
          getMetadata={getMetadata} 
          data={data}
        />
      </div>

    </div>
    
    
    </>
  );
};


export default GridView
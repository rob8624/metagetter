import MetadataPanel from "./metadataPanel";
import ImageCard from "./imageCard";

// Grid View Component
const GridView = ({ 
  data, 
  selectedImage, 
  onImageClick, 
  onDelete, 
  getMetadata,
  confirmDelete,
  setConfirmDelete,
  menuRef
}) => {
  return (
    <div className="flex flex-col sm:flex-row w-full max-w-6xl gap-4">
      {/* Images Grid - Left Side */}
      <div className="flex-1">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((item) => (
            <ImageCard
              key={item.id}
              item={item}
              confirmDelete={confirmDelete}
              setConfirmDelete={setConfirmDelete}
              isSelected={selectedImage?.id === item.id}
              onImageClick={onImageClick}
              onDelete={onDelete}
              showTools={true}
              menuRef={menuRef}
            />
          ))}
        </div>
      </div>

      {/* Metadata Panel - Right Side */}
      <div className="w-80 bg-gray-50 border rounded-md p-4">
        <MetadataPanel 
          selectedImage={selectedImage} 
          getMetadata={getMetadata} 
        />
      </div>
    </div>
  );
};


export default GridView
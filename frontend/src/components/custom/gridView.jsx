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
  setIsEditing,
  sectionRefs,
  imagesRef,
  setImageZoomed,
  imageZoomed,
  detailPanelRef
}) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  return (
    <>
      <div
        className="flex flex-col sm:flex-row gap-2
       dark:text-white dark:bg-black h-full sm:pb-24 flex-shrink"
        ref={(el) => (refs.current.summary = el)}
       >
        

        <div className="flex-grow flex flex-col h-full sm:grid sm:grid-cols-5 auto-rows-auto">
          <div
            ref={imagesRef}
            className="flex flex-wrap items-center justify-center sm:col-span-5 gap-5 sm:gap-0"
          >
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
                imageZoomed={imageZoomed?.id === item.id}
                setImageZoomed={setImageZoomed}
              />
            ))}

            
          </div>
          {selectedImage ? (
              <DataTools
                selectedImage={selectedImage}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            ) : null}
            <div className="col-span-full overflow-auto max-h-80 sm:max-h-none" ref={detailPanelRef}>
                {isEditing ? (
                  <EditForm
                    data={data}
                    selectedImage={selectedImage}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                  />
                ) : (
                  
                  <DetailPanel
                    selectedImage={selectedImage}
                    data={data}
                    setSelectedImage={setSelectedImage}
                    sectionRefs={sectionRefs}
                    
                  />
                
                )}
            </div>
        </div>

        <div className="m-2 bg-gray-50 sticky border rounded-md p-4 order-1 sm:order-2 block sm:hidden dark:text-white dark:bg-black ">
          <MetadataPanel
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            getMetadata={getMetadata}
            data={data}
            showPanel={showPanel}
            setShowPanel={setShowPanel}
          />{" "}
        </div>

        

        {/* Metadata Panel - Right Side */}
       
          <div className=" bg-gray-50 min-w-[200px] md:w-[230px] lg:w-[300px] shrink-0 border selection:rounded-md  overflow-x-auto  order-1 sm:order-2 hidden sm:block dark:text-white dark:bg-black">
            
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

export default GridView;

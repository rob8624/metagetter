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
}) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  return (
    <>
      <div
        className="mx-auto sm:w-9/12 flex flex-col sm:flex-row gap-2
     dark:text-white dark:bg-black max-h-full "
        ref={(el) => (refs.current.summary = el)}
      >
        

        <div className="flex-grow flex">
          <div
            ref={imagesRef}
            className="grid grid-cols-2  gap-5 sm:gap-10  rounded-lg backdrop-blur-xl sm:p-10   bg-white
          dark:text-white dark:bg-black scroll-mt-32 sticky top-7  "
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

            {selectedImage ? (
              <DataTools
                selectedImage={selectedImage}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            ) : null}
          </div>
        </div>

        <div className="m-2 bg-gray-50 sticky border rounded-md p-4 h-fit order-1 sm:order-2 block sm:hidden dark:text-white dark:bg-black ">
          <MetadataPanel
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            getMetadata={getMetadata}
            data={data}
            showPanel={showPanel}
            setShowPanel={setShowPanel}
          />{" "}
        </div>

        <div
          className="w-screen sm:w-full order-2 sm:order-1 shadow-lg p-2 rounded-lg  max-h-[80%]"
          ref={(el) => (refs.current.dataSection = el)}
        >
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

        {/* Metadata Panel - Right Side */}
       
          <div className="w-80 bg-gray-50 border rounded-md p-4 h-fit sticky top-10 order-1 sm:order-2 hidden sm:block dark:text-white dark:bg-black ">
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

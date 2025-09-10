import { useState } from "react";
import { useDeleteImage } from "../../services/mutations"
import { FaAngleDown } from "react-icons/fa6";

import { Button } from "../ui/button";

import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger, } from "../ui/dropdown-menu";



import {Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  } from "../ui/dialog";


const ImageCard = ({ 
  item, 
  isSelected, 
  setSelectedImage,
  selectedImage,
  onImageClick, 
  onDelete, 
  confirmDelete,
  setConfirmDelete,
  showTools = false,
  className = "" ,
  menuRef,
  imageRef,
  imageToDelete,
  setImageToDelete
}) => {

  
  
  
  const { mutate: deleteImage } = useDeleteImage();
  

  // function that handles the deleting of an image
 const handleDelete = async (image) => {
      deleteImage(image)
};


  return (
   
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`cursor-pointer border-2 rounded-md overflow-hidden transition-all duration-200 ${
          isSelected 
            ? 'border-blue-500 ring-2 ring-blue-200' 
            : 'border-gray-200 hover:border-gray-400'
        }`}
        onClick={() => onImageClick(item)}
      >
        <img
          ref={imageRef}
          src={item.image_thumbnail_url}
          alt={item.id}
          className="w-full h-10 sm:h-32 object-cover"
        />
      </div>


      {/* image menu */}
       <DropdownMenu>
        <DropdownMenuTrigger ref={menuRef} onClick={() => {setSelectedImage(item);}}><FaAngleDown size={35} /></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Image Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
        <DropdownMenuItem onClick={() => {
       
        setImageToDelete(item);
        
        setConfirmDelete(true);
        console.log(item.id)
        }}>
  Delete image
</DropdownMenuItem>
          
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> 

  
       {/* Delete dialog */}
       <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
         <DialogContent>
            
          <DialogHeader>
            
            <DialogTitle>Are you absolutely sure?
              
              {imageToDelete?.image_thumbnail_url && (
                <img src={imageToDelete.image_thumbnail_url} alt="Preview" />
              )}
                  
                
            </DialogTitle>
            <DialogDescription>
              <span className="text-red-600">WARNING!</span> This will permanently delete your image
              and remove it from our servers.
            </DialogDescription>
            <DialogFooter>
              <Button className="sm:mr-5" variant="destructive" onClick={() => handleDelete(imageToDelete)}>Delete</Button>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      
      
      
    </div>
    
  );
  
};

export default ImageCard
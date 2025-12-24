

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


  import { FaCheck } from "react-icons/fa";


const ImageCard = ({ 
  item, 
  isSelected, 
  setSelectedImage,

  onImageClick, 

  confirmDelete,
  setConfirmDelete,
 
  className = "" ,
  refs,
  imageToDelete,
  setImageToDelete,

  openDropdownId,
  setOpenDropdownId,
}) => {

  
  
  
  const { mutate: deleteImage, isPending} = useDeleteImage();
  

  // function that handles the deleting of an image
 const handleDelete = async (image) => {
      deleteImage(image)
};



  return (
   <div className={`flex flex-col ${className}`}>
  <div
    className={`cursor-pointer shadow-xl border-2 rounded-md overflow-hidden transition-all duration-200 w-full ${
      isSelected 
        ? 'border-blue-500 ring-2 ring-blue-200' 
        : 'border-gray-200 hover:border-gray-400'
    }`}
    onClick={() => onImageClick(item)}
  >
    {/* Fixed aspect ratio container */}
    <div className="aspect-video w-full relative">
      <img
        ref={el => refs.current.image = el}
        src={item.image_thumbnail_url}
        alt={item.id}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Edited badge */}
      {item.metadata.edited && (
        <div className="absolute top-1 left-1 text-xs bg-white px-1 rounded flex items-center gap-1">
          <FaCheck className="text-red-500" />
          <span>edited</span>
        </div>
      )}
    </div>
    
    {/* Text below image */}
    <div className="text-xs font-raleway p-2 overflow-hidden text-ellipsis whitespace-nowrap">
      {item.upload_name}
    </div>
  </div>

   {/* image menu */}
       <DropdownMenu modal={false}
          open={openDropdownId === item.id}
          onOpenChange={(isOpen) => {
            setOpenDropdownId(isOpen ? item.id : null);
            ;
          }}
        >
        <DropdownMenuTrigger ref={el => refs.current.menu = el} onClick={() => {setSelectedImage(item);}}><FaAngleDown size={35} /></DropdownMenuTrigger>
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
          
          <DropdownMenuItem>Download Image</DropdownMenuItem>
          <DropdownMenuItem>Delete data</DropdownMenuItem>
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
              {isPending ? 'DELETING' : null}
              <span className="text-red-600">WARNING!</span> This will permanently delete your image
              and remove it from our servers.
            </DialogDescription>
            <DialogFooter>
              
              <Button className="sm:mr-5" variant="destructive" disabled={isPending} onClick={() => handleDelete(imageToDelete)}>Delete</Button>
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
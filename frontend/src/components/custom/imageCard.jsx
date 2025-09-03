import axiosInstance from "../../services/api";

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
  onImageClick, 
  onDelete, 
  confirmDelete,
  setConfirmDelete,
  showTools = false,
  className = "" ,
  menuRef
}) => {


  // function that handles the deleting of an image
 const handleDelete = async (imageId) => {
  const token = localStorage.getItem('a_t');
  console.log('Token exists:', !!token);
  console.log('Making DELETE request to:', `api/images/${imageId}`);
  
  try {
    const response = await axiosInstance.delete(`api/images/${imageId}/`); // Note the trailing slash
    console.log('Delete successful:', response.data);
    setConfirmDelete(!confirmDelete)
    return response.data;
  } catch(error) {
    console.log('Delete error:', error.response?.status);
    console.log('Error details:', error.response?.data);
    console.log('Full error:', error);
    throw error; // Re-throw so calling code can handle it
  }
};


  return (
   
    <div className={`flex flex-col ${className}`}>
      <div
        className={`cursor-pointer border-2 rounded-md overflow-hidden transition-all duration-200 ${
          isSelected 
            ? 'border-blue-500 ring-2 ring-blue-200' 
            : 'border-gray-200 hover:border-gray-400'
        }`}
        onClick={() => onImageClick(item)}
      >
        <img
          src={item.image_thumbnail_url}
          alt={item.id}
          className="w-full h-32 object-cover"
        />
      </div>


      {/* image menu */}
       <DropdownMenu>
        <DropdownMenuTrigger ref={menuRef}>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Image Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
            <DropdownMenuItem  onClick={() => setConfirmDelete(!confirmDelete)}>Delete image</DropdownMenuItem>
          
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> 

  
       {/* Delete dialog */}
       <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
         <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <span className="text-red-600">WARNING!</span> This will permanently delete your image
              and remove it from our servers.
            </DialogDescription>
            <DialogFooter>
              <button className="mr-5" onClick={() => handleDelete(item.id)}>Delete</button>
              <DialogClose asChild>
                <button >Cancel</button>
              </DialogClose>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      
      
      
       {showTools && (
        <div className="mt-2 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
              
            }}
            className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
          {/* Add more tools here */}
        </div>
      )} 
    </div>
    
  );
  
};

export default ImageCard
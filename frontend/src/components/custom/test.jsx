import { useState } from "react";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import Image from "../../components/custom/image";


//make a componant with the const varible keyword. 

const ImageCard = ({
  item, 
  isSelected, 
  onImageClick, 
  onDelete, 
  showTools = false,
  className = "" 
}) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <div className={`cursor-pointer border-2 rounded-md overflow-hidden transition-all duration-200 ${
                isSelected 
                ? 'border-blue-500 ring-2 ring-blue-200' 
                : 'border-gray-200 hover:border-gray-400'
            }`}
            onClick={() => onImageClick(item)}
            >
                <img src={item.image_thumbnail_url} alt={`${item.id}`}className="w-full h-32 object-cover"/>
                
            </div>
            {showTools && (
                <div className="mt-2 flex gap-2">
                    <button onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                    }}>

                    </button>
                </div>
                )
            }
        </div>
        )
    }
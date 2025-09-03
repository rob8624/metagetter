
import Image from "../../components/custom/image";

import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";


// Slideshow View Component
const SlideshowView = ({ 
  data, 
  onImageClick, 
  onDelete, 
  getMetadata 
}) => {
  return (
    <ScrollArea className="w-4/5 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {data.map((item) => (
          <figure key={item.id} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <Image
                src={item.image_thumbnail_url}
                alt={"image by Rob"}
                data={data}
                className="aspect-[3/4] h-fit w-fit object-cover"
                width={"w-80"}
                height={600}
                id={item.id}
                metadata={getMetadata(item.metadata)}
              />
              
              {/* Add tools for slideshow too */}
              <div className="mt-2 flex gap-2 justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default SlideshowView
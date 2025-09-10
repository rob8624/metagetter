import { ScrollArea } from "../../components/ui/scroll-area";


// Reusable MetadataPanel component
const MetadataPanel = ({ selectedImage, getMetadata }) => {
  if (!selectedImage) {
    return (
      <div className="flex items-center justify-center text-gray-500">
        <p>Select an image to view its metadata</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Image Metadata</h3>
      <div className="mb-4">
        <img
          src={selectedImage.image_thumbnail_url}
          alt={selectedImage.id}
          className="w-full h-48 object-cover rounded border"
        />
      </div>
      
      <ScrollArea className="h-96">
        <div className="text-sm">
          {getMetadata(selectedImage.metadata)}
        </div>
      </ScrollArea>
    </div>
  );
};


export default MetadataPanel
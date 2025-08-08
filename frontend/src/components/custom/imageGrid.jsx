import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import Image from "../../components/custom/image"


export default function ImageGrid({ data }) {

    
    const getMetadata = (metadata) => {
    const entries = Object.entries(metadata?.data?.[0] || {});
    console.log(metadata)
    return entries.map(([key, value]) => (
      <div key={key}>
        {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
      </div>
    ));
  };


    return (
    
    <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {data.map((item) => (
          <figure key={item} className="shrink-0">
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
            </div>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
    
  )
}
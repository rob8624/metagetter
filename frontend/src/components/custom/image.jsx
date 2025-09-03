import { useState } from "react"
import MetaData from "./metaData"





export default function Image({ src, alt, width, height, id, metadata }) {
    const [showMetaData ] = useState(true)

    return (
       <>
 <div className="flex flex-col items-center">
  {/* Fixed-height image container */}
  <div className="h-64 flex items-center justify-center">
    <img 
      src={src} 
      width={width} 
      height={height} 
      id={id}
      alt={alt}
      className="object-contain max-h-full"
    />
  </div>

  {showMetaData ? 
  <MetaData classname={`${width} backdrop:sm:w-80 h-80 overflow-scroll border rounded p-2 mt-2`} metadata={metadata} width={width}/>
  :
  null
  }
 
</div>
</>
    )
}
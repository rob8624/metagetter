





export default function Image({ src, alt, width, height, id, metadata}) {
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

  {/* Metadata area */}
  <div className={`${width} backdrop:sm:w-80 h-80 overflow-scroll border rounded p-2 mt-2`}>
    {metadata}
  </div>
</div>
</>
    )
}
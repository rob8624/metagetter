export default function MetaData({ classname, metadata, width }) {
    return (
         <div className={`${width} backdrop:sm:w-80 h-80 overflow-scroll border rounded p-2 mt-2`}>
    {metadata}
  </div>
    )
}
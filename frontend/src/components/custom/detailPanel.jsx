
import {
  Table,
  TableBody,
  
  TableCell,
  
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"





//function to process to filter data to selected image object only
export const getSelectedData = (data, selectedImage) => {
    const rawData = data.filter((item) => item.id === selectedImage?.id);
    const indexedData = rawData.length > 0 ? rawData[0] : null; //safety check if selectedImage return undefined (if no image selected)
    return indexedData }





export default function DetailPanel({ data, selectedImage, setSelectedImage }) {

    if (!getSelectedData(data, selectedImage)) {
        return <div className="text-lg font-semibold">Select and image to view metadata</div>;
    }

    return (
     <> 
  {
    Object.entries(getSelectedData(data, selectedImage)?.grouped_metadata).map(([key, value]) => (
         <>
    <div onClick={() => setSelectedImage(null)}>Close</div>
    <div>Extracted <span className="font-bold">{key}</span> data</div>
      <Table  key={key} className="my-4 mr-10">
        <TableHeader>
          <TableRow>
            <TableHead className="sm:w-[100px]">Data Field</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Render rows for each nested key-value pair */}
          {Object.entries(value).map(([nestedKey, nestedValue]) => (
            <TableRow key={nestedKey} className="text-wrap"> 
              <TableCell className="font-bold text-blue-950">{nestedKey}</TableCell>
              <TableCell className="font-medium">{nestedValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </>
    ))
  }





         {/* <div className="flex text-wrap max-w-96 flex-wrap">
                {Object.entries(getSelectedData(data, selectedImage)?.grouped_metadata).map(([key, value]) => (
                    <div key={key}>
                        <strong>{key}:</strong> {Object.entries(value).map(([key, value]) => (<div>{key}, {value}</div>))}
                    </div>
                ))}
                
        </div> */}
        </>
    );
}
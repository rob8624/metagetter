


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





export default function DetailPanel({ data, selectedImage, sectionRefs }) {
  const selectedData = getSelectedData(data, selectedImage);

  if (!selectedData) {
    return <div className="text-lg font-semibold">Select an image to view metadata</div>;
  }

  return (
    // ✅ SINGLE scroll container
    <div className="h-full overflow-y-auto" id="detail-scroll-container">
      {Object.entries(selectedData.grouped_metadata).map(([key, value]) => (
        <div key={key} className="mb-12">
          
          {/* ✅ section anchor */}
          <div
            ref={(el) => {
              if (el) sectionRefs.current[key] = el;
            }}
            className="scroll-mt-32"
          >
            <span className="font-bold bg-gray-200 p-1 rounded-lg">
              Extracted {key}
            </span>
          </div>

          <Table className="my-4 mr-10">
            <TableHeader>
              <TableRow>
                <TableHead className="sm:w-[100px]">Data Field</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(value).map(([nestedKey, nestedValue]) => (
                <TableRow key={nestedKey}>
                  <TableCell className="font-bold">
                    {nestedKey}
                  </TableCell>
                  <TableCell>
                    {nestedValue}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </div>
      ))}
    </div>
  );


   
    
    





     
}
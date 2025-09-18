
import { ScrollArea } from "../../components/ui/scroll-area";
import { getSelectedData } from "./detailPanel";
import { DataTypeChart } from "./charts/dataTypeChart";


// Reusable MetadataPanel component
const MetadataPanel = ({ selectedImage, getMetadata, data }) => {

   
  
  
  
  
  if (!selectedImage) {
    return (
      <div className="flex items-center justify-center text-gray-500">
        <p>Select an image to view its metadata</p>
      </div>
    );
  }

  //const metaData = selectedImage.metadata ? getMetadata(selectedImage.metadata) : 'No metadata available'; 

  const rawData = getSelectedData(data, selectedImage)
  const summaryData = rawData?.summary_metadata;

  console.log('summarydata', summaryData)

  //component to handle displaying summary data, color is block color, padding creates size

  const SummaryDataProcess = ({ styles, data }) => {
  
  if (!data) return null;

  return (
    <div className="flex gap-2 flex-wrap">
      {Object.entries(data).map(([key, value]) => (
        <div 
          key={key} 
          className={`flex flex-col items-center justify-center h-auto max-w-full ${styles.color} rounded-md`}
        >
          <div className={styles.padding}>
            <span className="font-bold text-xs">{key}:</span>
           <div className="flex flex-wrap gap-2">

            {Array.isArray(value) ? 
            value.map((item, index) => (
              <span key={index} className="text-xs text-wrap">{item}</span>
             )) :
            typeof value === 'object' ? 
            Object.entries(value).map(([key, value]) => 
             <div key={key} className="text-xs text-wrap w-content">
                <span className="font-bold">{key}:</span>{value}
              </div>) 
            : 
            <span className="text-xs text-wrap">{value}</span>}
            </div>
          
          </div>
        </div>
      ))}
    </div>
  );
};

//list of object with values passes as props to summay component. Key must match that of data from serializer in summar_data
const summaryConfig = [
  { 
    key: 'data_types', 
    title: 'Data Types', 
    styles: { color: 'bg-orange-400', padding: 'p-3' },
    useChart: true
    
  },
  { 
    key: 'camera_details', 
    title: 'Camera Details', 
    styles: { color: 'bg-yellow-300', padding: 'p-3' },
    useChart: false
  },
  {
    key: 'image_details', 
    title: 'Images Details', 
    styles: { color: 'bg-yellow-300', padding: 'p-3' },
    useChart: false
  },
  {
    key: 'creator_details', 
    title: 'Creator', 
    styles: { color: 'bg-yellow-300', padding: 'p-3' },
    useChart: false
  }
  
 ]
  

 
  return ( 
    <div>
      <h3 className="text-lg font-semibold mb-4">Metadata Summary</h3>
      <div className="mb-4">
        <img
          src={selectedImage.image_thumbnail_url}
          alt={selectedImage.id}
          className="w-full h-48 object-cover rounded border"
        />
      </div>
      
      <ScrollArea className="h-96">
        <div className="text-sm w-full">
         {summaryConfig.map(({ key, title, styles, useChart }) => (
          <div key={key}>
          <div className="font-lg font-bold mb-2">{title}</div>
          {useChart ?
          <DataTypeChart data={summaryData?.data_types}/>
          :
          <SummaryDataProcess data={summaryData?.[key]} styles={styles}/> 
          }   
        </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};


export default MetadataPanel
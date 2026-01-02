import { ScrollArea } from "../../components/ui/scroll-area";
import { getSelectedData } from "./detailPanel";
import { DataTypeChart } from "./charts/dataTypeChart";
import { useMediaQuery } from "@react-hook/media-query";
import { Button } from "../ui/button";
// Reusable MetadataPanel component
const MetadataPanel = ({ selectedImage, data, showPanel, setShowPanel, }) => {
  const matches = useMediaQuery("only screen and (min-width: 600px)");
  
  // Get data once at the top level
  const rawData = getSelectedData(data, selectedImage);
  const summaryData = rawData?.summary_metadata;
  const locationData = rawData?.location;

  console.log('summarydata', summaryData);
  console.log('location date', locationData)

 const LocationDataProcess = ({ data }) => {
  if (!data) return null;
  const { latitude, longitude, message } = data;
 

 return (
    <div>
      {message && (
        <div className="text-xs">
          {message} for this image
        </div>
      )}

      {latitude && longitude && (
        <div>
          <h4 className="text-xs font-bold">Location data found</h4>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View on Google Maps
          </a>

          <div className="text-xs flex gap-2">
            <span className="font-bold">Lat:</span> {latitude}<br />
            <span className="font-bold">Lng:</span> {longitude}
          </div>
        </div>
      )}
    </div>
  );
};


  //component to handle displaying summary data, color is block color, padding creates size
  const SummaryDataProcess = ({ styles, data }) => {
    if (!data) return null;

    return (
      <div className="flex gap-2 flex-wrap dark:text-white dark:bg-black">
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
      styles: { color: "bg-black text-white dark:text-white dark:bg-black", padding: "p-3" },
      useChart: true
    },
    { 
      key: 'camera_details', 
      title: 'Camera Details', 
      styles: { color: "bg-black text-white dark:text-white dark:bg-black", padding: "p-3" },
      useChart: false
    },
    {
      key: 'image_details', 
      title: 'Images Details', 
      styles: { color: "bg-black text-white dark:text-white dark:bg-black", padding: "p-3" },
      useChart: false
    },
    {
      key: 'creator_details', 
      title: 'Creator', 
      styles: { color: "bg-black text-white dark:text-white dark:bg-black", padding: "p-3" },
      useChart: false
    }
  ];

  return (
    selectedImage ? (
      (showPanel || matches) ? (
         <div className="clear-both">
          {!matches && (
            <Button 
              onClick={(e) => {
                e.stopPropagation(); 
                setShowPanel(false);
              }} varient="outline"
              className="mb-2 px-3 py-1"
            >
              Close
            </Button>
          )}
          <div className="clear-both shadow-xl border-black border-1 rounded-lg" >
            <LocationDataProcess data={locationData}/>
            <h3 className="text-lg font-semibold mb-4">Metadata Summary</h3>
            
            <div className="mb-4">
              <img
                src={selectedImage?.image_thumbnail_url}
                alt={selectedImage?.id}
                className="w-full h-48 object-cover rounded border"
              />
            </div>

            <ScrollArea className="h-96">
              <div className="text-sm w-full">
                {summaryConfig.map(({ key, title, styles, useChart }) => (
                  <div key={key}>
                    <div className="font-lg font-bold mb-2">{title}</div>
                    {useChart ? (
                      <DataTypeChart data={summaryData?.data_types} />
                    ) : (
                      <SummaryDataProcess data={summaryData?.[key]} styles={styles} />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      ) : (
        // Only show toggle on mobile when panel is closed
        <Button 
          onClick={(e) => {
            e.stopPropagation(); 
            setShowPanel(true);
          }} variant="outline"
          className="w-full"
        >
          Show Metadata Panel
        </Button>
      )
    ) : (
      <div className="flex items-center justify-center text-gray-500">
        <p>Select an image to view its metadata</p>
      </div>
    )
  );
};

export default MetadataPanel;
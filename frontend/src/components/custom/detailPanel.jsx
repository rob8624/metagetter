
//function to process to filter data to selected image object only
export const getSelectedData = (data, selectedImage) => {
    const rawData = data.filter((item) => item.id === selectedImage?.id);
    const indexedData = rawData.length > 0 ? rawData[0] : null; //safety check if selectedImage return undefined (if no image selected)
    return indexedData }





export default function DetailPanel({ data, selectedImage }) {

    if (!getSelectedData(data, selectedImage)) {
        return <div className="text-lg font-semibold">Select and image to view metadata</div>;
    }

    return (
         <div className="overflow-x-scroll text-wrap max-w-96 ">
                {Object.entries(getSelectedData(data, selectedImage)?.grouped_metadata).map(([key, value]) => (
                    <div key={key}>
                        <strong>{key}:</strong> {Object.entries(value).map(([key, value]) => (<div>{key}, {value}</div>))}
                    </div>
                ))}
        </div>
    );
}
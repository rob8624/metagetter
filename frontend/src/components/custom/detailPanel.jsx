

export default function DetailPanel({ data, selectedImage }) {
    const rawData = data.filter((item) => item.id === selectedImage?.id);
    const indexedData = rawData.length > 0 ? rawData[0] : null; //safety check if selectedImage return undefined (if no image selected)

    console.log('indexedData:', indexedData);
    console.log('grouped_metadata:', indexedData?.grouped_metadata);

    if (!indexedData) {
        return <div>No matching data found.</div>;
    }

    return (
         <div className="overflow-x-scroll text-wrap max-w-96 ">
                {Object.entries(indexedData?.grouped_metadata).map(([key, value]) => (
                    <div key={key}>
                        <strong>{key}:</strong> {Object.entries(value).map(([key, value]) => (<div>{key}, {value}</div>))}
                    </div>
                ))}
        </div>
    );
}
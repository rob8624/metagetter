



 function CallToActionCard({title, description}) {
        return(<div className="flex flex-col flex-1 flex-shrink-0
        text-center border rounded-lg border-black dark:border-white shadow-xl backdrop-blur-md">
            <div className="font-bold text-5xl lg:text-4xl p-10  dark:text-white">
                <div className="mb-5">{title}</div>
                <p className="text-sm  font-raleway font-normal dark:text-white text-black bg-white
                opacity-50 rounded-md p-2">{description}</p>
            </div>
            

        </div>)
    }



export default function CallToAction() {

    
    const CardDetails = [
       
        {   card:"Upload Card",
            title:"Upload.",
            description: "Once registered, Metagetter users can upload a maximum of four images at a time"
        },
        {   card:"View Card",
            title:"View.",
            description: <>
                View <strong> all </strong>image metadata, organised by data type. 
                Metagetter uses the power of <strong>Exiftool</strong> to find fields not viewable via Photoshop
                or Photo Mechanic
            </>
        },
         {   card:"Process Card",
            title:"Process.",
            description: <><strong>Edit</strong> metadata, <strong>download</strong> as TXT or JSON file or simply
            <strong> delete </strong>all image data."</>
        },

    ]
    
    
    return (
        <>
        <div className="col-start-5 row-start-4 col-span-6 bg-yellow-300">
        {CardDetails.map((item, index) => {
            return (
                <>
               x\zx\zx\zx
                <CallToActionCard key={index} {...item}/>
               
                </>
            )
        })}
        </div>
        </>
        
    )
}
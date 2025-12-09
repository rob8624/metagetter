



 function CallToActionCard({title, description}) {
        return(<div className="flex flex-col flex-1 sm:min-w-32
        text-center border rounded-lg border-black dark:border-white shadow-xl">
            <div className="font-bold text-6xl p-10 dark:text-white">
                {title}
                <p className="text-sm font-normal dark:text-white">{description}</p>
            </div>
            

        </div>)
    }



export default function CallToAction() {

    
    const CardDetails = [
       
        {   card:"Upload Card",
            title:"Upload.",
            description: "Once registered, Metagetter users can upload a maximum of 5 images at a time"
        },
        {   card:"View Card",
            title:"View.",
            description: <>
                View <strong>all</strong>image metadata, organised by data type. 
                Metagetter uses the power of <strong>Exiftool</strong> to find fields not viewable via Photoshop
                or Photo Mechanic
            </>
        },
         {   card:"Process Card",
            title:"Process.",
            description: <><strong>Edit</strong> metadata, <strong>download</strong> as TXT or JSON file or simply
            <strong>delete</strong>all image data."</>
        },

    ]
    
    
    return (
        <>
        <div className="mx-auto flex flex-col gap-7 lg:flex-row w-3/4 sm:w-3/4 justify-between mt-10">
        {CardDetails.map((item, index) => {
            return (
                <>
               
                <CallToActionCard key={index} {...item}/>
               
                </>
            )
        })}
        </div>
        </>
        
    )
}
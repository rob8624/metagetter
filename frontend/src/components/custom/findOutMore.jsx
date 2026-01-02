import { FaXmark } from "react-icons/fa6";

export default function FindOutMore({ setShowFindOutMore }) {
    return (
        <>
        <div className="mx-auto w-3/4 lg:w-2/4 bg-white rounded-2xl shadow-lg p-4 relative max-h-full overscroll-auto ">
            <header className="bg-slate-200 rounded-lg w-fit">
                <h2 className="text-sm font-raleway p-1 mb-1">
                    <span className="inline">About, </span>
                    <span className="font-bold text-2xl">Metagetter.</span>
                </h2>
                <button className="absolute top-1 right-3" onClick={() => setShowFindOutMore(prev => !prev)}><FaXmark className="" /></button>
            </header>
            <section className="mt-1 text-sm">
                <p>
                Metagetter allows users to upload images and extract the metadata embedded within each file. 
                        Powered by{" "}
                        <a
                        href="https://exiftool.org/"
                        className="inline font-bold underline italic"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        ExifTool
                        </a>
                        , Metagetter collects all available metadata, including fields that are not typically accessible through standard imaging software such as Photo Mechanic or Adobe Photoshop.
                    </p>
                    <h3 className="bg-slate-200 rounded-lg p-1 w-fit mt-1 mb-1">What Metagetter Can See & Why It Matters </h3>
                    <p>
                       Metagetter can access the full range of metadata embedded in your images, including EXIF, IPTC, and XMP fields. 
                       This means it can reveal details that are often hidden in standard photo software, such as camera make and model, 
                       lens information, creation dates, copyright details, and serial numbers. Viewing certaian data collected can help determine 
                       if images contain private or sensitive information.
                    </p>
                    <h3 className="bg-slate-200 rounded-lg p-1 w-fit mt-1 mb-1">Features</h3>
                    
                    <p>Some of the features available now:</p>
                        <ul className="list-disc list-inside ml-4">
                        <li>Free user accounts</li>  
                        <li>Easy to use uploader and automatic data extraction into metadata groups</li>  
                        <li>A custom made viewer, making it easy to view and navigate data fields</li>
                        <li>A metadata summary, including a data type chart for quick analysis on the type of data held</li>
                        <li>Edit metadata fields directly</li>
                        <li>Download files with the new, edited metadata</li>
                        <li>Download metadata and .txt</li>
                        <li>Download metadata as a JSON file</li>
                        </ul>
                    <p>Metagetter is still being actively being developed, with many more features in the pipeline.</p>
                    <h3 className="bg-slate-200 rounded-lg p-1 w-fit mt-1 mb-1">What it's not, and what it cannot do!</h3>
                    <p>Metagetter is a powerful tool, but it is no way a replacement for Photo Mechanic or any other image editing software with metadata functionality.
                    At this moment it does not allow bulk editing or templating and only some fields are editable. It is designed to be used by users who want to see all data, 
                    an online backup tool for professionals needing to edit data, people who want to check privacy details, developers who need JSON data or to help improve SEO.
                    </p>
                        
                    
            </section>
          
        </div>
        </>
    )
}
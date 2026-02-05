import { FaXmark } from "react-icons/fa6";

export default function FindOutMore({ setShowFindOutMore }) {
  return (
    <>
      <div className="col-span-full row-span-full lg:col-start-3 lg:row-start-1 lg:col-span-8 lg:row-span-8  rounded-3xl font-raleway">
        <div className="flex flex-col sm:flex-row gap-3 p-2 overflow-auto h-full">
          <div className="flex-1 text-center text-wrap ">
            <span className="">Images </span>
            <span className="">can hold vital information.... </span>

            <img
              className="rounded-2xl pt-2 pb-2"
              alt="discover-image"
              src="https://images.pexels.com/photos/1133742/pexels-photo-1133742.jpeg?_gl=1*17osn36*_ga*MTE5NTY5MTM5OS4xNzcwMDMzNzIz*_ga_8JE65Q40S6*czE3NzAwMzM3MjIkbzEkZzEkdDE3NzAwMzM3MzEkajUxJGwwJGgw"
            />
            <div>
              <h2>
                Metagetter allows you to access{" "}
                <span className="font-bold">all</span> image metadata.{" "}
                <span className="font-bold">
                  View, edit, delete and download this data
                </span>
                <div className="italic text-sm sm:text-base">Utilizing the power of Exiftool, we can help you extract more information from images than software such as Photoshop or Photo Mechanic.
                    Upload. Extract. Access image data.
                </div>
              </h2>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <ul className="border-2 border-black p-2 relative rounded-xl">
              <li>
                <div className="font-bold">Edit data values</div>
                <div className="text-sm text-gray-600">
                  Modify metadata fields directly and write it back to the image
                </div>
              </li>
              <li>
                <div className="font-bold">Download as text, JSON or XMP format</div>
                <div className="text-sm text-gray-600">
                  Export your data in multiple formats
                </div>
              </li>
               <li>
                <div className="font-bold">View image location</div>
                <div className="text-sm text-gray-600">
                  If GPS information is available, view the exact location.
                </div>
              </li>
              <li>
                <div className="font-bold">Delete all data</div>
                <div className="text-sm text-gray-600">
                  Remove all metadata from your image
                </div>
              </li>
              <div className="absolute text-xs top-1 right-2 font-bold hover:cursor-pointer" onClick={() => setShowFindOutMore(prev => !prev)}>
               
                Close
              </div>
              
            </ul>
            <div>Privacy/Terms/Contant</div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
//services
import axiosInstance from "../../services/api";

//font and spinners

import { ClipLoader } from "react-spinners";

//comonents


import ImageGrid from "../../components/custom/imageGrid";
import TopBar from "../../components/custom/topbar";

import "react-image-gallery/styles/css/image-gallery.css";

// Fetch function for your images
const fetchData = async () => {
  try {
    const response = await axiosInstance.get("api/images");
    console.log("Fetched Data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching images:", err);
    throw err;
  }
};

export default function Viewer() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false)  
  const sectionRefs = useRef({});
  const imagesRef = useRef(null);

  const { data, isFetching } = useQuery({
    queryKey: ["images"],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });

  console.log("data (viewer.jsx)", data);

  return (
    <>
    
    <div className="relative col-span-full row-span-full flex flex-col gap-2 pb-10 md:pb-0">
    
       <TopBar
         selectedImage={selectedImage}
         setSelectedImage={setSelectedImage}
        data={data}
         sectionRefs={sectionRefs}
       isEditing={isEditing}
         imagesRef={imagesRef}
      />
    
    { isFetching ? (<div className="flex col-span-full row-span-full justify-center items-center">
        <div>
          <ClipLoader loading={isFetching} />
         </div>
    </div>) : 
    <div className="row-span-1 max-h-[95%]">
      <ImageGrid
           data={data}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
           sectionRefs={sectionRefs}
          isEditing={isEditing}
           setIsEditing={setIsEditing}
         imagesRef={imagesRef}
        
        /></div>}
      </div>
    </>
  );
}


//  <div>
//       <TopBar
//         selectedImage={selectedImage}
//         setSelectedImage={setSelectedImage}
//         data={data}
//         sectionRefs={sectionRefs}
//         isEditing={isEditing}
//         imagesRef={imagesRef}
//       />
//     <div/>
//       <Separator />
//       {isFetching ? (
//         <div className="flex flex-col justify-center items-center mt-40">
//           <ClipLoader loading={isFetching} />
         
//             <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
//             Processing…
          
//         </div>
//       ) : (
//         <div>
//         <ImageGrid
//           data={data}
//           selectedImage={selectedImage}
//           setSelectedImage={setSelectedImage}
//           sectionRefs={sectionRefs}
//           isEditing={isEditing}
//           setIsEditing={setIsEditing}
//           imagesRef={imagesRef}
        
//         />
//         </div>
//       )}
//       </div>
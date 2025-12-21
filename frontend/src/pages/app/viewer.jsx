import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
//services
import axiosRaw from "../../services/axiosRaw";

//font and spinners

import { ClipLoader } from "react-spinners";

//comonents

import { Separator } from "../../components/ui/separator";
import ImageGrid from "../../components/custom/imageGrid";
import TopBar from "../../components/custom/topbar";

import "react-image-gallery/styles/css/image-gallery.css";

// Fetch function for your images
const fetchData = async () => {
  const token = localStorage.getItem("a_t");

  if (!token) {
    console.log("No token found");
    throw new Error("No token found");
  }

  const response = await axiosRaw.get("api/images", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Fetched Data:", response.data);
  return response.data;
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
      <TopBar
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        data={data}
        sectionRefs={sectionRefs}
        isEditing={isEditing}
        imagesRef={imagesRef}
      />

      <Separator />
      {isFetching ? (
        <div className="flex flex-col justify-center items-center mt-40">
          <ClipLoader loading={isFetching} />
         
            <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
            Processing…
          
        </div>
      ) : (
        <ImageGrid
          data={data}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          sectionRefs={sectionRefs}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          imagesRef={imagesRef}
        />
      )}
    </>
  );
}

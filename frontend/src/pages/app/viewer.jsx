import { useEffect, useState } from "react";

import axiosRaw from "../../services/axiosRaw";

import PageGridTitle from "../../components/custom/PageGridTitle";
import { Separator } from "../../components/ui/separator";

import { FaCompressArrowsAlt } from "react-icons/fa";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";







export default function Viewer () {

  const [data, setData] = useState([])
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      const token = localStorage.getItem('a_t');
      try{
          const response = await axiosRaw('api/images' , {
             headers: {
          Authorization: `Bearer ${token}`
        },
          })
          
          setData(response.data)
          setImages(response.data.map(item => item.image_url));
          console.log(data)
          
      } catch(error) {
        console.log(error)
      }
    }
    
    fetchImages()
}, [data])





//     const images = [
//   {
//     original: "https://picsum.photos/id/1018/1000/600/",
//     thumbnail: "https://picsum.photos/id/1018/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//     thumbnail: "https://picsum.photos/id/1015/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//     thumbnail: "https://picsum.photos/id/1019/250/150/",
//   },
// ];





    return (
        <>
        <div className="flex flex-col justify-center items-center">
        {images.map((item) => {
          return <img src={item} alt=""/>
        })}
        <PageGridTitle className="pt-5"
                  title={"Viewer"}
                  descripition={"Here you can view and edit your data"}
                  subDescription={"Select an image to view options"}
                  icon={<FaCompressArrowsAlt />}
                  color={"grey"}
                />

        <Separator/>
        <ImageGallery items={images}/>
        </div>
        
        </>
        
    )
}

import { useQuery } from '@tanstack/react-query'

import axiosRaw from "../../services/axiosRaw";

import PageGridTitle from "../../components/custom/PageGridTitle";
import { Separator } from "../../components/ui/separator";

import { FaCompressArrowsAlt } from "react-icons/fa";


import "react-image-gallery/styles/css/image-gallery.css";




// Fetch function for your images
const fetchData = async () => {
  const token = localStorage.getItem('a_t');
  if (!token) {
    console.log('No token found'); // Log if the token is missing
    throw new Error('No token found');
  }

  const response = await axiosRaw.get('api/images', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('Fetched Data:', response.data); // Log the response data
  return response.data;
};


export default function Viewer () {

  
  const { data, isLoading } = useQuery({
  queryKey: ['images'], 
  queryFn: fetchData
});

console.log('data', data)
// const userImages = data ? data.map(item => item.image_url) : [];
  
  
//   useEffect(() => {
//     const fetchImages = async () => {
//       const token = localStorage.getItem('a_t');
//       try{
//           const response = await axiosRaw('api/images' , {
//              headers: {
//           Authorization: `Bearer ${token}`
//         },
//           })
          
//           setData(response.data)
//           setImages(response.data.map(item => item.image_url));
//           console.log(data)
          
//       } catch(error) {
//         console.log(error)
//       }
//     }
    
//     fetchImages()
// }, [data])





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
        
        <PageGridTitle className="pt-5"
                  title={"Viewer"}
                  descripition={"Here you can view and edit your data"}
                  subDescription={"Select an image to view options"}
                  icon={<FaCompressArrowsAlt />}
                  color={"grey"}
                />

        <Separator/>
        {isLoading ? <div>Loading</div> : data.map((item,) => {
          return <div>
            <img src={item.image_url} alt=""/> 
            {Object.entries(item.metadata.data[0]).map(([key, value]) => (
                <div className={key.startsWith('XMP') ? 'text-blue-200 flex': null}
                 key={key}>
                {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
            </div>
              ))}
            </div>
        })} 
       
        </div>
        
        </>
        
    )
}
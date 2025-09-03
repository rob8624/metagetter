
import { useQuery } from '@tanstack/react-query'

//services
import axiosRaw from "../../services/axiosRaw";




//font and spinners
import { FaCompressArrowsAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

//comonents
import PageGridTitle from "../../components/custom/PageGridTitle";
import { Separator } from "../../components/ui/separator";
import ImageGrid from '../../components/custom/imageGrid';


import "react-image-gallery/styles/css/image-gallery.css";




// Fetch function for your images
const fetchData = async () => {
  const token = localStorage.getItem('a_t');
  if (!token) {
    console.log('No token found'); 
    throw new Error('No token found');
  }

  const response = await axiosRaw.get('api/images', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('Fetched Data:', response.data);
  return response.data;
};


export default function Viewer () {

  
  const { data, isFetching } = useQuery({
  queryKey: ['images'], 
  queryFn: fetchData
});

console.log('data', data)

 return (
        
        <div className="flex flex-col justify-center items-center">
        
        <PageGridTitle className="pt-5"
                  title={"Viewer"}
                  descripition={"Here you can view and edit your data"}
                  subDescription={"Select an image to view options"}
                  icon={<FaCompressArrowsAlt />}
                  color={"grey"}
                />

        <Separator/>
        {isFetching ? 
        <div className='flex flex-col justify-center items-center mt-40'>
        
        <ClipLoader loading={isFetching}/> 
        <div className='font-serif'>Processing images</div>
        </div>
        : 
        <ImageGrid data={data}/>} 
       </div>
    )
}
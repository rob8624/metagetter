import axiosInstance from '../../services/api';
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"



export default function Terms() {

    const navigate = useNavigate();
    
    const {data: item, isLoading, isError} = useQuery({
        queryKey : ['terms'],
        queryFn: async () => {
            const {data} = await axiosInstance.get('terms/')
            return data;
        }
    })

   if (isError) return <div>Something went wrong.</div>;
   if (isLoading) return <div>Loading...</div>;
    

    return(
        <>
        
        <div className="prose col-span-full overflow-auto row-span-full">
            <div onClick={() => navigate(-1)} className='flex justify-center items-center sticky top-0'>BACK</div>
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
        </>
    )

}
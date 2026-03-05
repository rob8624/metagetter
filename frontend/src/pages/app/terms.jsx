import axiosInstance from '../../services/api';
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button";




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
        
        <div className="prose col-span-full overflow-auto row-span-full relative">
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
        <div className='col-span-full flex justify-center items-center'>
        <Button onClick={() => navigate(-1)}>BACK</Button>
        </div>
        </>
    )

}
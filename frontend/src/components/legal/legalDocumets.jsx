import axiosInstance from '../../services/api';
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../components/ui/button";


export default function LegalDocument({queryKey, endpoint}) {
    const navigate = useNavigate();

    const {data: item, isLoading, isError} = useQuery({
        queryKey : [queryKey],
        queryFn: async () => {
            const {data} = await axiosInstance.get(endpoint)
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
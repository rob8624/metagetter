import { FaBolt } from "react-icons/fa6";
import { useQuery } from '@tanstack/react-query';
import axiosInstance from "../../services/api.js"


export default function News() {


    const fetchNews = async () => {
        const response = await axiosInstance.get('/news')
        return response.data
    }
 
    const { data: items , isLoading, error } = useQuery(
        {
            queryKey:['News'],
            queryFn: fetchNews
        }
    )

   
   


    return(
         <div className='
          items-center flex flex-col rounded-lg bg-blue-100 p-2 '>
                        <div className='flex text-sm md:text-2xl sm:text-3xl font-raleway underline'>

                          <span>Annoucements</span>
                          <span className='relative top-[3px]'><FaBolt/></span>

                        </div>
                        <div>{isLoading && <div>Loading...</div>}</div>
                        <div>{items?.map((item) => {
                            return (
                                <div key={item.id}>
                                    <div className="text-xs text-center pb-2" dangerouslySetInnerHTML={{ __html: item.content }} />
                                </div>
                            )
                        })}</div>
        </div>       
    )
}
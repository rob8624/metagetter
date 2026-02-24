import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

import { useQuery } from "@tanstack/react-query";

import axiosInstance from '../../services/api';




export default function Faq() {
  

  const { data: items, isLoading, isError } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/faqs');
      return data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  
  if (isError) return <div>Something went wrong.</div>;
  if (isLoading) return <div>Loading...</div>;

 





  return (
    <div className="col-span-full row-span-full flex flex-col gap-2 items-center pt-10">
      <div className="text-4xl sm:text-6xl font-raleway">FAQ</div>
      <div className="w-full flex justify-center">
        
            <Accordion
            type="multiple"
            collapsible
            className="w-full sm:w-3/5 rounded-lg border"
        >
            {items.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-b px-4 last:border-b-0">
                <AccordionTrigger className="font-bold font-raleway text-lg">{item.title}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
            ))}
        </Accordion>
       
      </div>
    </div>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

const items = [
  {
    value: "item-1",
    trigger: "What is MetaGetter?",
    content:
      "MetaGetter is an app that can extract and display all metadata from images. This includes hidden data that is not normally accesible through Photoshop or Photo Mechanic"
      ,
  },
  {
    value: "item-2",
    trigger: "How do I reset my password?",
    content:
      "You can reset your password by clicking 'reset password' in the sing-in page section. You will be sent and email to the address used for registartion.",
  },
  {
    value: "item-3",
    trigger: "What payment methods do you accept?",
    content:
      "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
  },
];

export default function Faq() {
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
            <AccordionItem key={item.value} value={item.value} className="border-b px-4 last:border-b-0">
                <AccordionTrigger className="font-bold font-raleway text-lg">{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
            ))}
        </Accordion>
       
      </div>
    </div>
  );
}

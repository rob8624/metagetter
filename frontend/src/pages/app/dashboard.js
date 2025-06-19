import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "../../components/ui/card"
import { Button } from "../../components/ui/button"

import { FaArrowUp,} from 'react-icons/fa';
import { FaCompressArrowsAlt } from "react-icons/fa";


export default function Dashboard({ children }) {


   const DashboardCard = ({title, description, showButton, 
    buttonName, footer, buttonColor, icon}) => {
    return (
        <>
         <Card>
            <CardHeader>
                <CardTitle className="flex justify-center">{title}</CardTitle>
                <CardDescription className="flex justify-center">{description}</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex flex-wrap items-center justify-center gap-2 md:flex-row">
                    { showButton && <Button variant="outline" className={`${buttonColor}`}> {icon} {buttonName}</Button>}
                </div>
            </CardContent>
            <CardFooter>
                <p>{footer}</p>
            </CardFooter>
        </Card>
        </>
    )
   }





    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-20 gap-4">
            <div>
                <DashboardCard 
                title={'Upload'} 
                description={'Click here to start uploading images'}
                footer={'You can upload a maximun of five images'}
                showButton={true}
                buttonName={'Upload'}
                buttonColor={'bg-blue-500'}
                icon={<FaArrowUp className="pr-2 text-2xl" />}/>
            </div>
            <div>
                <DashboardCard title={'View Metadata'} 
                description={'Click here to view images'}
                footer={'From here you can display data and edit'}
                showButton={true}
                buttonName={'View data'}
                buttonColor={'bg-green-500'}
                icon={<FaCompressArrowsAlt className="pr-2 text-2xl"/>}/>
            </div>
        </div>
    )

}
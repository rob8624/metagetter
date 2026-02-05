import { useEffect, useState } from "react";

import UserServices from "../../services/userServices";

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

import { Link } from "react-router";


export default function Dashboard({ children }) {

 const [canUpload, setCanUpload] = useState(null)

   useEffect(() => {
    async function checkUploadStatus() {
        try {
            const result = await UserServices.CanUploadCheck()
            setCanUpload(result)
        } catch (error) {
            setCanUpload(false)
            console.log('Cannot check status' , error)
        }
    }

    checkUploadStatus()

   }, [])



   const DashboardCard = ({title, description, showButton, 
    buttonName, footer, buttonColor, backgroundColor, icon, link, enabled, className}) => {
    return (
        <>
        <Card className={`${backgroundColor} ${className} h-full shadow-lg border-2 border-black dark:border-white dark:bg-black sm:hover:scale-105 sm:transition-all sm:duration-300 ease-in`}>
      <CardHeader>
        <CardTitle className="flex justify-center min-h-0">{title}</CardTitle>
        <CardDescription className="flex justify-center min-h-0">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center justify-center gap-2 md:flex-row min-h-0">
          {showButton && (
            enabled ? (
              <Button asChild variant="outline" className={`${buttonColor}`}>
                <Link to={link}>
                  {icon} {buttonName}
                </Link>
              </Button>
            ) : (
              <Button disabled variant="outline" className="bg-gray-400 cursor-not-allowed">
                {icon} Upload Limit Reached
              </Button>
            )
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center min-h-0">
        <p>{footer}</p>
      </CardFooter>
    </Card>
        </>
    )
   }





    return(
      <>
       <div className="col-start-full col-span-full row-span-full 
      lg:col-start-4 lg:col-span-6 lg:row-start-2 lg:row-span-7 overflow-auto lg:overflow-visible">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <DashboardCard 
                title={'Upload'} 
                description={'Click here to start uploading images'}
                footer={'You can upload a maximun of five images'}
                showButton={true}
                buttonName={'Upload'}
                buttonColor={'bg-green-500'}
                backgroundColor={'bg-white'}
                icon={<FaArrowUp className="pr-2 text-2xl"/>}
                link={'/upload'}
                enabled={canUpload}/>
            </div>
            <div>
                <DashboardCard title={'View Metadata'} 
                description={'Click here to view images'}
                footer={'From here you can display data and edit'}
                showButton={true}
                buttonName={'View data'}
                buttonColor={'bg-green-500'}
                backgroundColor={'bg-white'}
                icon={<FaCompressArrowsAlt className="pr-2 text-2xl"/>}
                link={'/viewer/'}
                enabled={true}
                />
            </div>
             
           <DashboardCard title={'FAQ and Further Information'} 
                description={'Coming soon! Find out more about how to use Metagetter'}
                footer={'Soon, we will also be giving more information about future features'}
                showButton={true}
                buttonName={'Find out more'}
                buttonColor={'bg-green-500'}
                backgroundColor={'bg-white'}
                icon={<FaCompressArrowsAlt className="pr-2 text-2xl"/>}
                link={'/viewer/'}
                enabled={true}
                className={'sm:col-span-2'}
                />
       
        </div>
      </div>
      
      
      </>
    )

}
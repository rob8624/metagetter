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
    buttonName, footer, buttonColor, backgroundColor, icon, link, enabled}) => {
    return (
        <>
        <Card className={`${backgroundColor} dark:bg-black`}>
      <CardHeader>
        <CardTitle className="flex justify-center">{title}</CardTitle>
        <CardDescription className="flex justify-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center justify-center gap-2 md:flex-row">
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
      <CardFooter>
        <p>{footer}</p>
      </CardFooter>
    </Card>
        </>
    )
   }





    return(
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-20 gap-4">
            <div>
                <DashboardCard 
                title={'Upload'} 
                description={'Click here to start uploading images'}
                footer={'You can upload a maximun of five images'}
                showButton={true}
                buttonName={'Upload'}
                buttonColor={'bg-green-500'}
                backgroundColor={'bg-yellow-200'}
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
                backgroundColor={'bg-blue-200'}
                icon={<FaCompressArrowsAlt className="pr-2 text-2xl"/>}
                link={'/viewer/'}
                enabled={true}
                />
            </div>
        </div>
        </div>
    )

}
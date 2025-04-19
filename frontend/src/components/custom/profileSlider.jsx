import { useEffect } from "react"
import axiosInstance from "../../services/api"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../ui/sheet"


 export default function ProfileSheet() {



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('api/user-profile/')
                console.log(response)
            }
            catch(error) {
                console.log(error)
            }
        }
    
        fetchData()

    }, [])


    return (
        <Sheet>
            <SheetTrigger>Profile</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
            </Sheet>
    )
 }
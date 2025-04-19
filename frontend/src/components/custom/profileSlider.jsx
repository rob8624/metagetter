import { useEffect, useState } from "react"
import axiosInstance from "../../services/api"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../ui/sheet"


 export default function ProfileSheet({ isOpen, setIsOpen }) {
    const [ userData, setUserData] = useState([])
    


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('api/user-profile/')
                setUserData(response.data)
            }
            catch(error) {
                console.log(error)
            }
        }
       
        if (isOpen === true) {
        
            fetchData()}
           
    }, [isOpen, setIsOpen])


    return (
        <Sheet>
            
            <SheetTrigger>Profile</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>Your profile data</SheetTitle>
                <SheetDescription>
                
                    <div>ID: {userData.id}</div>
                    <div>Username: {userData.username}</div>
                    <div>Account email: {userData.email}</div>
                    <div>Status: {userData.active ? 'Active': 'Inactive'}</div>
                
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
            </Sheet>
    )
 }
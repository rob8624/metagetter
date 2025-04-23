import { useEffect, useState } from "react";

import UserServices from "../../services/userServices";

import {
  Sheet,
 
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function ProfileSheet({ isOpen, setIsOpen }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  
 


  useEffect(() => {
    // Only fetch if the sheet is open and we don't have data
    if (isOpen && !userData && !loading) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await UserServices.getProfile();
          setUserData(response);
        } catch (error) {
          console.log("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
    }
  }, [isOpen, userData, loading]);

 

  function ProfileData() {
    return(
      <div>
        <div className="mb-2">ID: {userData.id}</div>
                  
        <div>Status: {userData.active ? 'Active' : 'Inactive'}</div>
      </div>
    )
  }




  
  return (
 
    
    <Sheet openSheet={isOpen}  >
      <SheetTrigger>Profile</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your profile data</SheetTitle>
          <SheetDescription>
            {loading ? (
              <div>Loading profile data...</div>
            ) : userData ? (
              <>
               <ProfileData />
              </>
            ) : (
              <div>Failed to load profile data</div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
  
}
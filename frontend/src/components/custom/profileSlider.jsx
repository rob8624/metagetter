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
      <>
      <dl className="flex flex-wrap gap-x-8 gap-y-2 items-center">
        <div className="flex gap-2 items-center">
          <dt className="font-bold">ID#</dt>
          <dd>{userData.id}</dd>
        </div>
      
        <div className="flex gap-2 items-center">
          <dt className="font-bold">Status</dt>
          <dd>{userData.active ? "Active" : "Inactive"}</dd>
        </div>
      </dl>
    <hr className="mb-10" />
    <dl>
      <dt>Account email:</dt>
      <dd>{userData.email}</dd>
    </dl>
    </>
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
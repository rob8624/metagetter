import { useEffect, useState, useContext } from "react";

//context
import { UserContext } from "../../context/userContext";

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
  const [maxWarning, setMaxWarning] = useState(false)
  

  const {  updating, setUpdating } = useContext(UserContext);


  useEffect(() => {
 
    if ((isOpen && !userData && !loading) || updating) {
      
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await UserServices.getProfile();
          setUserData(response);
          console.log(userData)
        } catch (error) {
          console.log("Error fetching profile:", error);
        } finally {
          setLoading(false);
          setUpdating(false)
          
        }
      };
      
      fetchData();
    }
  }, [isOpen, userData, loading, updating, setUpdating]);

  
  useEffect(() => {
  if (!isOpen) {
    setUserData(null); // Clear data when sheet closes
  }
}, [isOpen]);

  useEffect(() => {
  if (userData && userData.uploaded_images === 5) {
    setMaxWarning(true);
  }
}, [userData]);

 

      function ProfileData() {

        const formatDate = (obj) => {
          const date = new Date(obj)
          const formattedDate = date.toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false, // 24-hour format
        });

          return formattedDate
        }

        // const date = new Date(userData.date_joined);
        // const formattedDate = date.toLocaleString('en-GB', {
        //   day: '2-digit',
        //   month: '2-digit',
        //   year: 'numeric',
        //   hour: '2-digit',
        //   minute: '2-digit',
        //   hour12: false, // 24-hour format
        // });

        return(
          <>
          <dl className="flex flex-wrap gap-x-8 gap-y-2 items-center justify-center sm:justify-start">
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
          <div>
            <dt className="font-bold">Account name:</dt>
            <dd>{userData.username}</dd>
          </div>
          <div>
            <dt className="font-bold">Account email:</dt>
            <dd>{userData.email}</dd>
          </div>
          <div>
            <dt className="font-bold">Date joined:</dt>
            <dd>{formatDate(userData.date_joined)}</dd>
          </div>
          <div>
            <dt className="font-bold">Uploads#:</dt>
            <dd className="inline-block pr-2">{userData.uploaded_images}</dd>
            { maxWarning ? <span className="text-red-600">Limit Reached</span> : null }
          </div>
          <div>
            <dt className="font-bold">Last login:</dt>
            <dd>{formatDate(userData.last_login)}</dd>
          </div>
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
import React from "react";
import { useState, useEffect } from "react";
import {
   
  } from "../ui/navigation-menu";
import { Link, useNavigate } from 'react-router-dom';
import { UseLoggedIn } from "../../context/userContext";
import authService from "../../services/authServices";

import { useQueryClient } from '@tanstack/react-query';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "../../components/ui/dialog"

import { Button } from "../../components/ui/button";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";



export default function Logout() {
  const [confirm] = useState(false) 
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false) 
  const [currentUser, setCurrentUser] = useState('')
  const { setLoggedIn } = UseLoggedIn();
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  useEffect(() => {
     try {
        const userData = localStorage.getItem('current_user')
        const currentUser = JSON.parse(userData)
        if (currentUser) {
          setCurrentUser(currentUser.username)
        } else {
          setCurrentUser('User')
        }
      }
     catch (error) {
      console.log(error)
     }
  }, [])

 

 useEffect(() => {
  if (!isLoggingOut) return

  const timer = setTimeout(() => {
        queryClient.clear()
        setLoggedIn(false);
        authService.logout()
        navigate('/');
        setIsOpen(false);
  }, 5000)

  return () => clearTimeout(timer);
  
}, [isLoggingOut, navigate, queryClient, setLoggedIn])
    




  
  const handleLogout = () => {
       setIsLoggingOut(true)
      };

  const handleCancel = () => {
    setIsLoggingOut(false)
    setIsOpen(false)
  }




   const ConfirmDialog = () => {
         
      
      return(
      <Dialog open={isOpen} onOpenChange={setIsOpen}> 
  <DialogTrigger>Logout?</DialogTrigger>  {/* just opens dialog */}

  <DialogContent showCloseButton={false}>
    <DialogHeader>
      {isLoggingOut ? null : <div className="flex gap-2">
        <DialogTitle className="font-raleway">Logout from Metagetter {currentUser}?</DialogTitle>
        <FaArrowRightFromBracket />
        </div>  }
      <DialogDescription>
        <div className={`flex ${isLoggingOut? 'flex-col justify-center items-center' : 'flex-row'} gap-3`}>
          {isLoggingOut ? <>
          <div className="font-raleway text-lg">Thanks for using the service, {currentUser}, now logging you out</div>
          <ClipLoader loading={isLoggingOut} />
          <DialogClose asChild>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          </DialogClose>
          </> :
          <>
          <Button variant="outline" onClick={handleLogout} disabled={isLoggingOut}>Confirm</Button>
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          </>}
          
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
      )
   } 


    return (
        <React.Fragment>
       

       {confirm ? 
       <Link to={"/"} onClick={handleLogout} className="pb-1">Logout</Link> : <ConfirmDialog/>}
      
        </React.Fragment> 
    )
}







import React from "react";
import {
   
  } from "../ui/navigation-menu";
import { Link, useNavigate } from 'react-router-dom';
import { UseLoggedIn } from "../../context/userContext";
import authService from "../../services/authServices";

import { useQueryClient } from '@tanstack/react-query';



export default function Logout() {
    
  const { setLoggedIn } = UseLoggedIn();
  const navigate = useNavigate()
  const queryClient = useQueryClient();

 


    const handleLogout = () => {
        queryClient.clear()
        console.log(queryClient)
        setLoggedIn(false);
        authService.logout()
        navigate('/');

      };


    return (
        <React.Fragment>
       
        <Link to={"/"} onClick={handleLogout} className="pb-1">
          Logout!
        </Link>
      
        </React.Fragment> 
    )
}







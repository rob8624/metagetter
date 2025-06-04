import React from "react";
import {
   
  } from "../ui/navigation-menu";
import { Link, useNavigate } from 'react-router-dom';
import { UseLoggedIn } from "../../context/userContext";
import authService from "../../services/authServices";



export default function Logout() {
    
  const { setLoggedIn } = UseLoggedIn();
  const navigate = useNavigate()


    const handleLogout = () => {
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







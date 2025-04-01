import React from "react";
import {
    NavigationMenuItem,
    navigationMenuTriggerStyle,
  } from "../ui/navigation-menu";
import { Link, useNavigate } from 'react-router-dom';
import { UseLoggedIn } from "../../context/userContext";
import authService from "../../services/authServices";



export default function Logout({  }) {
    
  const { setLoggedIn } = UseLoggedIn();
  const navigate = useNavigate()


    const handleLogout = () => {
        setLoggedIn(false);
        authService.logout()
        navigate('/');
      };


    return (
        <React.Fragment>
        <NavigationMenuItem>
        <Link 
          to={"/"} 
          className={navigationMenuTriggerStyle()}
          onClick={handleLogout}
        >
          Logout!
        </Link>
      </NavigationMenuItem>
        </React.Fragment> 
    )
}







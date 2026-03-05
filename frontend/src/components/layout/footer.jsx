import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  
  return (
  <div className='text-center dark:text-white dark:bg-black'> 
     <h1 className="text-xs">Copyright: Metagetter 2025. Contact support@metagetter for any enquries </h1>
     <span className="font-bold"><Link to='/terms'>Terms & Conditions</Link></span>
  </div>
 )
}

export default Footer
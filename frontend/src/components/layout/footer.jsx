import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  
  return (
  <div className='text-center dark:text-white dark:bg-black'> 
     <h1 className="text-xs">Copyright: Metagetter 2025. Contact support@metagetter for any enquries </h1>
     <div className="flex gap-1 justify-center items-center">
      <span className="font-bold"><Link to='/terms'>Terms & Conditions</Link></span>
      <span className="font-bold"><Link to='/privacy'>Privacy</Link></span>
     </div>
  </div>
 )
}

export default Footer

//react hooks
import { useEffect, useRef } from "react";

import { Button } from "../ui/button";


//router
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router";

//hooks
import { UseLoggedIn } from "../../context/userContext";

//gsap 
import gsap from "gsap";



export default function Hero({ setShowFindOutMore }) {
 
  const { loggedIn } = UseLoggedIn();
  const navigate = useNavigate();

  const heroTitle = useRef(null);
  const heroContainer = useRef(null);
  

  useEffect(() => {
    gsap.to(heroTitle.current, {
      opacity: 1,
      duration: 2,
      y:10,
      ease: "power2.out",})
  }, [])

  const handleDiscover = () => {
  gsap.to(heroContainer.current, {
    opacity: 0,
    y: -40,
    duration: 1,
    ease: "power2.in",
    onComplete: () => {
      setShowFindOutMore(prev => !prev);
    },
  });
};
  
  
  
  //handling click conditional, passing state to signin form 
  const handleclick = () => {
        if (loggedIn) {
          navigate("/dashboard")
        } else {
          navigate("/signin", { state : { fromHero:true }})
        }
   }
  
  return (
    <>

  <div className="row-start-2 row-span-3 col-start-3 col-span-8 flex flex-col justify-center items-center text-black font-raleway gap-4"
  ref={heroContainer}>
   
     
            <h1 className="text-6xl sm:text-8xl lg:text-9xl">
              <div id="hero-title" ref={heroTitle} className="opacity-0">
                <span className="font-light text-5xl sm:text-8xl lg:text-9xl italic">Meta</span>
                <span className="font-bold">Getter</span>
              </div>
            </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center text-center">
            <p className="font-bold text-xs sm:text-sm">
              Empower your metadata
            </p>

            <p className="text-xs sm:text-sm ">
              Upload images and discover all metadata information.
            </p>

            <p className="font-bold text-xs sm:text-sm">
              Edit. Download. Delete.
            </p>
        </div>
        <div className="flex items-center justify-center flex-row gap-x-3 text-xl font-bold">
          <Button onClick={handleclick}>Upload</Button>
          <Button onClick={handleDiscover}>Discovever</Button>
          {loggedIn ? null : <Button>
            <Link to="/register">Register</Link>
          </Button>}
        </div>
 
</div>

    

    </>
  );
}

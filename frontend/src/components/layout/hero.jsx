
//react hooks
import { useEffect, useLayoutEffect, useRef } from "react";

import { Button } from "../ui/button";
import CallToAction from "./cta";

//router
import { useNavigate } from 'react-router-dom';

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
        </div>
 
</div>

    
{/* <div className="sm:col-start-3 row-start-2 col-span-full sm:col-span-8">
  <div className="grid place-items-center h-full text-center gap-3 min-w-0">

  <h1
    className="
      font-raleway font-bold leading-none
      text-[clamp(3rem,8vw,7rem)]
      max-w-[9ch]
      bg-gradient-to-r
      from-black dark:from-white
      via-green-500
      to-black dark:to-white dark:via-orange-300
      text-transparent bg-clip-text
    "
  >
    MetaGetter
  </h1>

  <div className="grid gap-1 max-w-[40ch]">

    <h2 className="italic leading-tight text-[clamp(1.25rem,2vw,2rem)]">
      Empower your metadata
    </h2>

    <p className="font-raleway font-bold tracking-wide text-[clamp(0.8rem,0.9vw,1rem)]">
      Upload · View · Edit · Download
    </p>

  </div>

</div>
</div>
<div className="col-start-4 col-span-6 row-start-5 mt-6 ">
  <div className="flex w-full text-center text-[clamp(1.25rem,2vw,2rem)]">
    <div className="flex-1 bg-yellow-50">Login/Register</div>
    <div className="flex-1 bg-yellow-100">Features</div>
    <div className="flex-1 bg-yellow-200">FAQ</div>
  </div>

  

</div> */}

     
      
{/* 
      <div className=" bg-pink-300">
        <span className="font-raleway font-bold text-2xl sm:text-4xl pt-2 text-black  dark:text-white">
          Enpowering your Metadata
        </span>
        <p className="font-raleway  text-base pt-2 dark:text-white">
          Create, edit & enable, content data.
        </p>
        <div className="flex gap-4 w-64 justify-center pt-10 self-center">
          <Button variant="outline" className="flex-grow bg-black text-white dark:bg-orange-300 
           dark:hover:bg-white dark:hover:text-black" onClick={handleclick}>Upload</Button>
          <Button onClick={() => setShowFindOutMore(prev => !prev)} variant="outline" className="flex-grow  dark:bg-orange-300 bg-black text-white
           dark:hover:bg-white dark:hover:text-black">Find out more</Button>
        </div>

        </div>

    
    
        <CallToAction/>
    */}
    </>
  );
}

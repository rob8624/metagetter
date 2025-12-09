
import { Button } from "../ui/button";
import CallToAction from "./cta";

//router
import { useNavigate } from 'react-router-dom';

//hooks
import { UseLoggedIn } from "../../context/userContext";



export default function Hero() {
 
  const { loggedIn } = UseLoggedIn();
  const navigate = useNavigate();

  //handling click conditional, passing state to signin form 
  const handleclick = () => {
        if (loggedIn) {
          navigate("/dashboard")
        } else {
          navigate("/signin", { state : { fromHero:true }})
        }
   }
  
  return (
    <div className="h-full">
      <div className="flex flex-col text-center mt-16 ">
        <div id="hero-content-wrapper">
          <h1
            className="font-bold text-5xl sm:text-8xl font-sans 
                            bg-gradient-to-r from-black dark:from-white
                             via-green-500 to-black dark:to-white dark:via-orange-300
                             text-transparent bg-clip-text">
            MetaGetter
          </h1>
        </div>
        <span className="font-thin text-2xl sm:text-4xl pt-2  dark:text-white">
          Enpowering your Metadata
        </span>
        <p className="font-thin text-base pt-2 dark:text-white">
          Create, edit & enable, content data.
        </p>
        <div className="flex gap-4 w-64 justify-center pt-10 self-center">
          <Button variant="outline" className="flex-grow bg-green-200 dark:bg-orange-300
           dark:hover:bg-white dark:hover:text-black" onClick={handleclick}>Upload</Button>
          <Button variant="outline" className="flex-grow bg-green-200 dark:bg-orange-300
           dark:hover:bg-white dark:hover:text-black">FInd out more</Button>
        </div>
      </div>
    
        <CallToAction/>
    
    </div>
  );
}


import CallToAction from "./cta";




export default function Hero() {

  



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
        <p className="font-thin text-base pt-5 dark:text-white">
          Create, edit & enable, content data.
        </p>
      </div>
    <div className="flex flex-col items-center justify-center h-40"> 
        <CallToAction/>
    </div> 
    </div>
  );
}







export default function Hero() {

  



  return (
    <div className="h-full">
      <div className="flex flex-col text-center mt-16 ">
        <div id="hero-content-wrapper">
          <span
            className="font-bold text-3xl sm:text-7xl font-sans 
                            bg-gradient-to-r from-black via-green-500 to-black text-transparent bg-clip-text">
            MetaGetter
          </span>
        </div>
        <span className="font-thin text-2xl sm:text-5xl text-green dark:text-white">
          Enpowering your Metadata
        </span>
        <p className="font-thin text-lg pt-8 dark:text-white">
          Create, edit & enable, content data.
        </p>
      </div>
    </div>
  );
}

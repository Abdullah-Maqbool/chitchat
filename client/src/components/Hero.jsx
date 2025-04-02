import heroimg from "/heroimg.png";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="font-Quicksand grid grid-cols-1 lg:grid-cols-2 grid-rows-[1fr,1fr] lg:grid-rows-1 gap-4 w-full h-4/5 lg:h-[70%] md:mt-6">
      <img
        src={heroimg}
        alt="vector illustration"
        className="row-start-1 row-end-2 col-start-1 col-end-2 lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2 self-center justify-self-center"
      />
      <div className="row-start-2 row-end-3 col-start-1 col-end-1 lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3 md:py-12 md:px-20 lg:px-0 pt-16 sm:pt-16 2xl:mt-4">
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl md:text-4xl font-black bg-gradient-to-tr from-[#ff357a] to-[#fff172] text-transparent bg-clip-text">
            Stay Connected with
          </p>
          <div className="flex flex-row mt-1 md:mt-3">
            <p className="text-2xl md:text-4xl font-black bg-gradient-to-tr from-[#ff357a] to-[#fff172] text-transparent bg-clip-text">
              Your
            </p>
            <ReactTyped
              className="pl-2 md:pl-3 text-2xl md:text-4xl font-black bg-gradient-to-tr from-[#ff357a] to-[#fff172] text-transparent bg-clip-text"
              strings={["Friends", "Family", "Colleagues", "Loved ones"]}
              typeSpeed={100}
              backSpeed={100}
              loop
            />
          </div>
          <p className="text-sm text-center font-semibold md:text-base sm:mt-4 md:mt-6 lg:mt-4 pt-4 px-8 md:px-10 text-white">
            Experience seamless communication with a platform designed for you.
            Whether it&apos;s a quick chat or a detailed conversation, connect
            effortlessly with those who matter most.
          </p>
          <div className="flex flex-row">
            <Link
              to="/register"
              className="mr-2 border-black text-black text-center font-medium h-9 md:h-11 w-40 md:w-52 rounded-xl hover:rounded-3xl duration-300 py-1 md:text-lg border-2 bg-gradient-to-tr from-[#ff357a] to-[#fff172] mt-4 sm:mt-6 md:mt-6 lg:mt-8"
            >
              Get Started
            </Link>
            <Link
              to="/chat"
              className="ml-2 border-black text-black text-center font-medium h-9 md:h-11 w-40 md:w-52 rounded-xl hover:rounded-3xl duration-300 py-1 md:text-lg border-2 bg-gradient-to-bl from-[#ff357a] to-[#fff172] mt-4 sm:mt-6 md:mt-6 lg:mt-8"
            >
              Chat Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

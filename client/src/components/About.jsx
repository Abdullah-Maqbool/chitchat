import soloDev from "/soloDev.jpg";

const About = () => {
  return (
    <article className="mt-14 sm:mt-10 lg:mt-14 w-full font-Quicksand">
      <h1 className="text-center font-Honk text-4xl mb-10">About Me</h1>
      <div className="font-Quicksand grid grid-cols-1 lg:grid-cols-2 grid-rows-[1fr,1fr] lg:grid-rows-1 gap-4 gap-y-0 w-full h-4/5 md:mt-6">
        <div className="row-start-1 row-end-2 col-start-1 col-end-2 lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2 px-10">
          <img
            src={soloDev}
            alt="Solo Dev."
            className="border-2 border-solid border-black rounded-2xl h-full object-cover"
          />
        </div>
        <div className="row-start-2 row-end-3 col-start-1 col-end-1 lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3 px-10 sm:px-20 md:px-30 pt-6 lg:pt-0 lg:px-10 text-white">
          <h1 className="text-2xl font-black bg-gradient-to-tr from-[#ff357a] to-[#fff172] text-transparent bg-clip-text">
            About the Developer
          </h1>
          <p className="text-base text-justify mt-4">
            Hi there! I&apos;m the solo developer behind this chat application,
            bringing you seamless communication built with passion and
            expertise. With a strong background as a MERN stack developer and a
            keen eye for design using TailwindCSS, I aim to create user-friendly
            and efficient applications. Building this chat app has been a labor
            of love, driven by the goal of connecting people effortlessly. Your
            feedback and support are invaluable to me, and I&apos;m continuously
            working to enhance the app with new features and improvements. Thank
            you for being a part of this journey, and I hope you enjoy using the
            app as much as I enjoyed creating it!
          </p>
        </div>
      </div>
    </article>
  );
};

export default About;

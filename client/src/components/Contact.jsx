const Contact = () => {
  return (
    <section className="mt-14 sm:mt-10 md:mt-6 lg:mt-14 w-full font-Quicksand">
      <h1 className="text-center font-Honk text-4xl mb-10">Contact</h1>
      <div className="font-Quicksand grid grid-cols-1 lg:grid-cols-2 grid-rows-[1fr,1fr] lg:grid-rows-1 w-full h-4/5 md:mt-6">
        <div className="row-start-1 row-end-2 col-start-1 col-end-2 lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2 px-10 sm:px-20 md:px-28 lg:px-10 pt-10 lg:pt-0 text-white">
          <h1 className="text-2xl font-black bg-gradient-to-tr from-[#ff357a] to-[#fff172] text-transparent bg-clip-text">
            Get in Touch
          </h1>
          <p className="text-base text-justify mt-4">
            We value your feedback and are always eager to hear from you!
            Whether you have suggestions for new features, need assistance, or
            want to share your experience with our app, please fill out the form
            next to this message. Your input helps us improve and provide the
            best chat experience possible. Thank you for being a part of our
            community!
          </p>
        </div>
        <div className="row-start-2 row-end-3 col-start-1 col-end-1 lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3 px-10 sm:px-20 md:px-28 lg:px-10">
          <form className="flex flex-col gap-4">
            <input
              className="border-2 border-solid border-black rounded-xl px-3 py-2"
              type="email"
              name="email"
              id="email"
              required={true}
              autoComplete="email"
              spellCheck={false}
              placeholder="E-mail"
            />
            <input
              className="border-2 border-solid border-black rounded-xl px-3 py-2"
              type="text"
              name="subject"
              id="subject"
              required={true}
              spellCheck={true}
              placeholder="Subject"
            />
            <textarea
              rows={6}
              name="description"
              id="description"
              className="border-2 border-solid border-black rounded-xl px-3 py-2 resize-none"
              type="text"
              required={true}
              spellCheck={true}
              maxLength={1000}
              placeholder="Message (Max. 1000 characters)"
            />
            <button className="border-2 border-solid border-black rounded-xl hover:rounded-3xl duration-300 text-lg font-medium text-center py-2 bg-gradient-to-tr from-[#ff357a] to-[#fff172] w-40 self-center">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

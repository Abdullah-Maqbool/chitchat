import FeatureCard from "./cards/FeatureCard";

const Featured = () => {
  const featuredData = [
    {
      id: 1,
      title: "Real-Time Messaging",
      description:
        "Experience instant communication with real-time messaging. Whether you're chatting with friends, family, or colleagues, our platform ensures your messages are delivered instantly without any delays.",
      image: "/realtime.png",
      alt: "Image",
      style: "row-start-1 row-end-2 col-start-1 col-end-2 px-10",
    },
    {
      id: 2,
      title: "Secure and Private",
      description:
        "Your privacy is our priority. ChitChat uses end-to-end encryption to keep your conversations secure and private. Chat with confidence, knowing your messages are protected from unauthorized access.",
      image: "/secure.webp",
      alt: "Image",
      style:
        "row-start-2 row-end-3 col-start-1 col-end-2 md:row-start-1 md:row-end-2 md:col-start-2 md:col-end-3 px-10",
    },
    {
      id: 3,
      title: "Versatile and User-Friendly",
      description:
        "Enjoy a versatile chat experience with our intuitive and user-friendly interface. From one-on-one conversations to group chats, our app provides the tools you need to stay connected and organized.",
      image: "/userfriendly.png",
      alt: "Image",
      style:
        "row-start-3 row-end-4 col-start-1 col-end-2 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 lg:row-start-1 lg:row-end-2 lg:col-start-3 lg:col-end-4 px-10 md:px-[25%] lg:px-10 md:self-center lg:self-auto md:justify-self-center lg:justify-self-auto",
    },
  ];

  return (
    <section className="mt-14 sm:mt-0 md:mt-6 lg:mt-10 w-full font-Quicksand">
      <h1 className="text-center font-Honk text-4xl mb-10">Featured</h1>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr] lg:grid-cols-[1fr,1fr,1fr] grid-rows-[1fr,1fr,1fr] md:grid-rows-[1fr,1fr] lg:grid-rows-1 gap-y-6 w-full">
        {featuredData.map((obj) => (
          <FeatureCard key={obj.id} data={obj} />
        ))}
      </div>
    </section>
  );
};

export default Featured;

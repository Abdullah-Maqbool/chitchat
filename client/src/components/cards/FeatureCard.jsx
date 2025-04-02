const FeatureCard = (props) => {
  return (
    <div className={props.data.style}>
      <div className="border-2 border-black rounded-xl h-full">
        <img
          src={props.data.image}
          alt={props.data.alt}
          className="rounded-t-xl object-cover w-full h-60"
        />
        <h2 className="font-bold text-white pt-3 pb-2 px-4">
          {props.data.title}
        </h2>
        <p className="text-gray-300 px-4 pb-3 text-justify">
          {props.data.description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;

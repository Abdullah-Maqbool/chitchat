import { useSelector } from "react-redux";

const Message = (props) => {
  // fetch from global state
  const user = useSelector((state) => state.user.username);
  const sender = props.sender;

  const styleDecider = () => {
    if (sender === user) {
      return "bg-[#6b8afd] ml-[20%] mr-4 ";
    } else {
      return "bg-[#2e333d] mr-[20%] ml-4 ";
    }
  };

  return (
    <div
      className={
        "w-full flex flex-row items-center " +
        (sender === user ? "justify-end" : "justify-start")
      }
    >
      <div
        className={
          styleDecider() + "rounded-2xl px-4 py-3 m-2 justify-self-end"
        }
      >
        <p className="text-white text-pretty">{props.content}</p>
      </div>
    </div>
  );
};

export default Message;

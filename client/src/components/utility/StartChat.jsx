// Floating button to start a new chat
import { TbMessagePlus } from "react-icons/tb";
import { Link } from "react-router-dom";

const StartChat = () => {
  return (
    <Link to="/friends">
      <TbMessagePlus className="fixed bottom-24 right-6 text-white bg-[#6b8afd] w-14 h-14 p-2 rounded-3xl" />
    </Link>
  );
};

export default StartChat;

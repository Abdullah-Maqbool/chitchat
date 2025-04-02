import { IoChatbubbles } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { BsPeople } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Add logout functionality

const SideNav = ({ Nav, setNav }) => {
  const avatar = useSelector((state) => state.user.avatar);

  const getIconStyle = (navItem) => {
    return navItem === Nav
      ? "w-10 h-10 text-white"
      : "w-9 h-9 text-[#a9aeba] hover:text-gray-100 cursor-pointer";
  };

  const handleNavClick = (navItem) => {
    setNav(navItem); // inform parent about the change
  };

  return (
    <nav className="fixed left-0 flex flex-col items-center gap-12 h-full py-10 px-4">
      <Link to="/">
        <AiFillHome className="w-12 h-12 text-white hover:text-gray-300 border-2 rounded-full p-2" />
      </Link>
      {Nav === "chat" ? (
        <IoChatbubbles
          className={getIconStyle("chat")}
          onClick={() => handleNavClick("chat")}
        />
      ) : (
        <IoChatbubblesOutline
          className={getIconStyle("chat")}
          onClick={() => handleNavClick("chat")}
        />
      )}
      {Nav === "friends" ? (
        <BsPeopleFill
          className={getIconStyle("friends")}
          onClick={() => handleNavClick("friends")}
        />
      ) : (
        <BsPeople
          className={getIconStyle("friends")}
          onClick={() => handleNavClick("friends")}
        />
      )}
      {Nav === "addFriend" ? (
        <IoPersonAdd
          className={getIconStyle("addFriend")}
          onClick={() => handleNavClick("addFriend")}
        />
      ) : (
        <IoPersonAddOutline
          className={getIconStyle("addFriend")}
          onClick={() => handleNavClick("addFriend")}
        />
      )}
      {Nav === "groupChat" ? (
        <HiUserGroup
          className={getIconStyle("groupChat")}
          onClick={() => handleNavClick("groupChat")}
        />
      ) : (
        <HiOutlineUserGroup
          className={getIconStyle("groupChat")}
          onClick={() => handleNavClick("groupChat")}
        />
      )}
      <Link
        to="/profile"
        className="fixed bottom-10 left-3 bg-[#6b8afd] hover:bg-[#446bfa] w-14 h-14 p-1 rounded-full cursor-pointer"
      >
        <img className="w-full h-full rounded-full" src={avatar} alt="avatar" />
      </Link>
    </nav>
  );
};

export default SideNav;

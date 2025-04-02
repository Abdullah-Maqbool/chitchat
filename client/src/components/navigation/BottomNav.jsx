import { IoChatbubblesOutline } from "react-icons/io5";
import { BsPersonAdd } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useState } from "react";

const BottomNav = ({ onNavChange }) => {
  const [active, setActive] = useState("chat");

  const getIconStyle = (navItem) => {
    return navItem === active
      ? "w-12 h-12 text-white bg-[#6b8afd] rounded-2xl p-1"
      : "w-9 h-9 text-[#a9aeba]";
  };

  const handleNavClick = (navItem) => {
    setActive(navItem);
    onNavChange(navItem); // inform parent about the change
  };

  return (
    <nav className="fixed flex flex-row bottom-0 justify-evenly items-center w-full py-4 bg-[#131313] rounded-t-xl">
      <IoChatbubblesOutline
        className={getIconStyle("chat")}
        onClick={() => handleNavClick("chat")}
      />
      <BsPersonAdd
        className={getIconStyle("addFriend")}
        onClick={() => handleNavClick("addFriend")}
      />
      <HiOutlineUserGroup
        className={getIconStyle("groupChat")}
        onClick={() => handleNavClick("groupChat")}
      />
    </nav>
  );
};

export default BottomNav;

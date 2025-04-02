import { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { GoDotFill } from "react-icons/go";
import { IoSend } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Message from "./Message";

// Add Messages to the page
const Texting = () => {
  const { id } = useParams();
  const [msgQuery, setMsgQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const messagesEndRef = useRef(null);

  const messages = useMemo(
    () => [
      {
        content: "Hey, how are you?",
        sender: {
          _id: "64dbe46f6ef7f3a8a0b4c8f9",
          username: "user_one1",
        },
        read: false,
        time: new Date("2024-08-10T09:00:00Z"),
      },
      {
        content: "I'm doing well, thanks! How about you?",
        sender: {
          _id: "64dbe46f6ef7f3a8a0b4c8fa",
          username: "user_two2",
        },
        read: true,
        time: new Date("2024-08-10T09:01:00Z"),
      },
      {
        content:
          "I'm good too. Did you finish the project? lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        sender: {
          _id: "64dbe46f6ef7f3a8a0b4c8f9",
          username: "user_one1",
        },
        read: false,
        time: new Date("2024-08-10T09:03:00Z"),
      },
      {
        content: "Yes, I submitted it yesterday.",
        sender: {
          _id: "64dbe46f6ef7f3a8a0b4c8fa",
          username: "user_two2",
        },
        read: true,
        time: new Date("2024-08-10T09:04:00Z"),
      },
      {
        content: "Great! Let's catch up later then.",
        sender: {
          _id: "64dbe46f6ef7f3a8a0b4c8f9",
          username: "user_one1",
        },
        read: false,
        time: new Date("2024-08-10T09:05:00Z"),
      },
      {
        content: "Sure, see you later!",
        sender: {
          _id: "64dbe46f6ef7f3a8a0b4c8fa",
          username: "user_two2",
        },
        read: true,
        time: new Date("2024-08-10T09:06:00Z"),
      },
      {
        content: "Sure, see you later!",
        sender: {
          _id: "64dbe46f6ef7f3a8a0b4c8fa",
          username: "user_two2",
        },
        read: true,
        time: new Date("2024-08-10T09:06:00Z"),
      },
      {
        content: "Sure, see you later!",
        sender: {
          _id: "64dbe46f6ef7f3a8a0b4c8fa",
          username: "user_two2",
        },
        read: true,
        time: new Date("2024-08-10T09:06:00Z"),
      },
      {
        content: "Sure, see you later!",
        sender: {
          _id: "64dbe46f6ef7f3a8a0b4c8fa",
          username: "user_two2",
        },
        read: true,
        time: new Date("2024-08-10T09:06:00Z"),
      },
      {
        content: "Sure, see you later!",
        sender: {
          _id: "64dbe46f6ef7f3a8a0b4c8fa",
          username: "user_two2",
        },
        read: true,
        time: new Date("2024-08-10T09:06:00Z"),
      },
      {
        content: "Sure, see you later!",
        sender: {
          _id: "64dbe46f6ef7f3a8a0b4c8fa",
          username: "user_two2",
        },
        read: true,
        time: new Date("2024-08-10T09:06:00Z"),
      },
      {
        content: "Sure, see you later!",
        sender: {
          _id: "64dbe46f6ef7f3a8a0b4c8fa",
          username: "user_two2",
        },
        read: true,
        time: new Date("2024-08-10T09:06:00Z"),
      },
      {
        content: "Sure, see you later!",
        sender: {
          _id: "64dbe46f6ef7f3a8a0b4c8fa",
          username: "user_two2",
        },
        read: true,
        time: new Date("2024-08-10T09:06:00Z"),
      },
      {
        content: "Sure, see you later!",
        sender: {
          _id: "64dbe46f6ef7f3a8a0b4c8fa",
          username: "user_two2",
        },
        read: true,
        time: new Date("2024-08-10T09:06:00Z"),
      },
    ],
    []
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    if (id !== "") {
      scrollToBottom();
    }
  }, [id, messages]);

  return (
    <div className="flex flex-col w-full h-screen font-Archivo bg-[#202329]">
      <div className="fixed top-0 w-full flex flex-row justify-between items-center bg-[#131313] pb-3">
        <div className="flex flex-row items-center w-[85%] truncate pt-3 pl-2">
          <Link to="/chat" className="pr-2">
            <IoIosArrowBack className="text-white text-3xl" />
          </Link>
          <img
            src="/avatar.jpg"
            alt="avatar"
            className="rounded-2xl w-12 h-12"
          />
          <div className="flex flex-col pl-4">
            <h1 className="text-white text-xl font-bold">Sample User</h1>
            <div className="flex flex-row items-center">
              {/* Change color based on Status */}
              <GoDotFill className="text-green-500 text-lg" />
              {/* Fetch Status from Server */}
              <h3 className="text-gray-200 text-xs font-normal pl-1">Status</h3>
            </div>
          </div>
        </div>
        <HiDotsVertical
          className="text-white text-2xl mr-8 mt-2 cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        />
        {showMenu && (
          <div className="absolute right-10 top-14 bg-[#131313] border-2 border-[#6b8afd] rounded-xl shadow-2xl">
            <ul className="flex flex-col items-center justify-center text-white w-32">
              <li className="py-3 px-4 cursor-pointer hover:bg-[#2e333d] rounded-t-xl w-full text-center">
                Clear Chat
              </li>
              <li className="py-3 px-4 cursor-pointer hover:bg-[#2e333d] w-full text-center">
                Delete Chat
              </li>
              <li className="py-3 px-4 cursor-pointer hover:bg-[#2e333d] rounded-b-xl w-full text-center">
                Delete Friend
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="w-full h-full bg-[#202329] flex flex-col overflow-y-scroll mt-20 mb-20">
        {messages.map((message, index) => (
          <Message
            key={index}
            content={message.content}
            sender={message.sender.username}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="fixed bottom-0 w-full bg-[#131313]">
        <form className="flex flex-row items-center px-4 py-3">
          <input
            type="text"
            placeholder="Send a Message..."
            spellCheck={true}
            required={true}
            className="rounded-xl bg-[#2e333d] px-4 py-3 w-full placeholder-gray-400 text-white"
            value={msgQuery}
            onChange={(e) => setMsgQuery(e.target.value)}
          />
          <button>
            <IoSend className="text-white text-2xl bg-[#6b8afd] p-2 w-11 h-11 rounded-xl ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Texting;

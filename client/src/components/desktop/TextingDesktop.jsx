import { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import Message from "../Message";
import api from "../../axiosClient";
import { useSelector, useDispatch } from "react-redux";
import { setChatText, setChatTextMsg } from "../../features/user/userSlice";

const TextingDesktop = ({ chat, setChat, socket }) => {
  const [msgQuery, setMsgQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [socketLoggedIn, setSocketLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const username = useSelector((state) => state.user.username);
  const participants = [chat, username];
  const chats = useSelector((state) => state.user.chats);

  const selectChatByParticipants = (participants) => {
    return (
      chats.find((chat) =>
        chat.participants.every((participant) =>
          participants.includes(participant)
        )
      ) || { participants, messages: [] }
    );
  };

  const thisChat = selectChatByParticipants(participants);
  const { messages } = thisChat;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    if (!socketLoggedIn) {
      socket.emit("login", { username });
    }
    if (chat != "") {
      api
        .get(`/chat/${chat}`)
        .then((res) => {
          const { chat } = res.data;
          console.log("Chat fetched", chat);
          dispatch(setChatText(chat));
        })
        .catch((err) => {
          if (err.status === 404) {
            console.error("Chat not found", err);
            dispatch(setChatText({ participants, messages: [] }));
          } else {
            console.error("Error fetching chat", err);
          }
        });
    }
  }, [chat, socketLoggedIn]);

  useEffect(() => {
    if (chat !== "") {
      scrollToBottom();
    }
  }, [chat]);

  socket.on("loggedIn", (userId) => {
    console.log("Logged in", userId);
    if (username === userId.username) {
      setSocketLoggedIn(true);
    }
  });

  // Fix receiveMessage event repitition

  // socket.on("receiveMessage", (data) => {
  //   console.log("Received message", data);
  //   const { fromUserId, message } = data;
  //   const msg = {
  //     content: message,
  //     sender: fromUserId,
  //     read: false,
  //     time: new Date().toString(),
  //   };
  //   dispatch(setChatTextMsg({ participants, msg }));
  // });

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      console.log("Received message", data);
      const { fromUserId, message } = data;
      const msg = {
        content: message,
        sender: fromUserId,
        read: false,
        time: new Date().toString(),
      };
      dispatch(setChatTextMsg({ participants, msg }));
    };

    socket.on("receiveMessage", handleReceiveMessage);

    // Clean up the event listener when the component unmounts
    // return () => {
    //   socket.off("receiveMessage", handleReceiveMessage);
    // };
  }, [participants, dispatch]);

  // Send text to API to store in DB
  const handleSend = (e) => {
    e.preventDefault();
    if (msgQuery === "") return;
    else {
      socket.emit("sendMessage", { toUserId: chat, message: msgQuery });
      const msg = {
        content: msgQuery,
        sender: username,
        read: false,
        time: new Date().toString(),
      };
      dispatch(setChatTextMsg({ participants, msg }));
      setMsgQuery("");
    }
  };

  return chat === "" ? (
    <div className="w-full h-full flex flex-col text-center text-xl justify-center text-white pb-12">
      <h1>Open an existing chat</h1>
      <div className="flex flex-row items-center justify-center my-4">
        <div className="bg-white h-1 w-full ml-56"></div>
        <h2 className="text-lg mx-4">OR</h2>
        <div className="bg-white h-1 w-full mr-56"></div>
      </div>
      <h1>Start a new one</h1>
    </div>
  ) : (
    <div className="w-full h-full relative">
      <div className="relative top-0 w-full flex flex-row justify-between items-center pb-3">
        <div className="flex flex-row items-center w-[85%] truncate pt-3 pl-2">
          <div className="pr-2 cursor-pointer">
            <IoIosArrowBack
              className="text-white text-3xl"
              onClick={() => setChat("")}
            />
          </div>
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
          <div className="absolute right-10 top-14 bg-[#131313] rounded-xl shadow-2xl">
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
      <div className="w-full lg:h-[73%] xl:h-[75%] bg-[#202329] flex flex-col overflow-y-scroll px-6">
        {messages.map((message, index) => (
          <Message
            key={index}
            content={message.content}
            sender={message.sender}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="absolute bottom-4 w-full px-4 bg-[#202329]">
        <form className="flex flex-row items-center px-4 py-3">
          <input
            type="text"
            placeholder="Send a Message..."
            spellCheck={true}
            required={true}
            className="rounded-xl bg-[#2e333d] px-4 py-3 pr-16 w-full placeholder-gray-400 text-white truncate"
            value={msgQuery}
            onChange={(e) => setMsgQuery(e.target.value)}
          />
          <button type="submit" onClick={handleSend}>
            <IoSend className="text-white hover:text-[#6b8afd] w-8 h-8 absolute right-12 bottom-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TextingDesktop;

// List of Existing Chats
import ChatCard from "./cards/ChatCard";
import { FiSearch } from "react-icons/fi";
import { CiCircleRemove } from "react-icons/ci";
import { useState } from "react";
import StartChat from "./utility/StartChat";
import { Link } from "react-router-dom";

const Chats = () => {
  // In actual scenario, fetch chats from the server
  const chatsArray = [
    {
      displayName: "John Doe",
      username: "johndoe123",
      avatar: "/avatar.jpg",
      lastMessage:
        "Hey there! lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      unread: true,
    },
    {
      displayName: "Jane Doe",
      username: "janedoe123",
      avatar: "/avatar.jpg",
      lastMessage: "How's it going?",
      unread: true,
    },
    {
      displayName: "John Smith",
      username: "johnsmith123",
      avatar: "/avatar.jpg",
      lastMessage: "Let's catch up later.",
      unread: true,
    },
    {
      displayName: "Jane Smith",
      username: "janesmith123",
      avatar: "/avatar.jpg",
      lastMessage: "Meeting at 3 PM.",
      unread: true,
    },
    {
      displayName: "John Doe",
      username: "johndoe12",
      avatar: "/avatar.jpg",
      lastMessage: "Got your message.",
      unread: true,
    },
    {
      displayName: "Jane Doe",
      username: "janedoe12",
      avatar: "/avatar.jpg",
      lastMessage: "Sounds good!",
      unread: true,
    },
    {
      displayName: "John Smith",
      username: "johnsmith12",
      avatar: "/avatar.jpg",
      lastMessage: "Can you send the file?",
      unread: false,
    },
    {
      displayName: "Jane Smith",
      username: "janesmith12",
      avatar: "/avatar.jpg",
      lastMessage: "See you soon.",
      unread: true,
    },
    {
      displayName: "John Doe",
      username: "johndoe1",
      avatar: "/avatar.jpg",
      lastMessage: "Thanks!",
      unread: true,
    },
    {
      displayName: "Jane Doe",
      username: "janedoe1",
      avatar: "/avatar.jpg",
      lastMessage: "I'll be there.",
      unread: false,
    },
    {
      displayName: "John Smith",
      username: "johnsmith1",
      avatar: "/avatar.jpg",
      lastMessage: null,
      unread: true,
    },
    {
      displayName: "Jane Smith",
      username: "janesmith1",
      avatar: "/avatar.jpg",
      lastMessage: "Catch you later.",
      unread: true,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  // Later sort for time as well
  // Sort the chats based on the unread messages
  const sortedChats = chatsArray.sort((a, b) => {
    // Compare unread status: true should come before false
    if (a.unread === b.unread) {
      return 0; // No change if both have the same unread status
    }
    return a.unread ? -1 : 1; // Move unread chats to the top
  });

  // Filter the chats based on the search query
  const filteredChats = sortedChats.filter((chat) =>
    chat.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-screen">
      <h1 className="text-4xl text-center py-3 font-Honk">Chats</h1>
      <form className="flex flex-row items-center px-4 py-2">
        <FiSearch className="h-7 w-7 absolute left-9 text-gray-400" />
        <input
          type="text"
          placeholder="Search existing Chats..."
          spellCheck={false}
          required={true}
          className="rounded-2xl bg-[#2e333d] py-4 pl-12 pr-11 mx-2 w-full placeholder-gray-400 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CiCircleRemove
          className="h-6 w-6 absolute right-9 text-gray-400"
          onClick={() => setSearchQuery("")}
        />
      </form>
      {filteredChats.length === 0 ? (
        <h1 className="flex flex-col justify-center items-center px-4 h-full mb-24 overflow-scroll text-white">
          No Chats... Start a new one!
        </h1>
      ) : (
        <div className="flex flex-col px-4 mt-4 space-y-3 mb-24 overflow-scroll">
          {filteredChats.map((chat, index) => (
            <Link key={index} to={`/chat/${chat.username}`}>
              <ChatCard data={chat} />
            </Link>
          ))}
        </div>
      )}
      <StartChat />
    </div>
  );
};

export default Chats;

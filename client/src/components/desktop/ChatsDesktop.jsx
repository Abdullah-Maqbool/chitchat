// List of Existing Chats
import { FiSearch } from "react-icons/fi";
import { CiCircleRemove } from "react-icons/ci";
import { useState } from "react";
import ChatCardDesktop from "./ChatCardDesktop";
import { useSelector } from "react-redux";

const ChatsDesktop = (props) => {
  const chatsArray = useSelector((state) => state.user.chatCards);
  // const chatsArray = [
  //   {
  //     displayName: "John Doe",
  //     username: "johndoe123",
  //     avatar: "/avatar.jpg",
  //     lastMessage:
  //       "Hey there! lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     unread: true,
  //   },
  //   ...
  // ];

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
  const filteredChats = sortedChats.filter((chats) =>
    chats.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-w-[30%] h-screen pl-2">
      <form className="flex flex-row items-center px-2 py-2 relative">
        <input
          type="text"
          placeholder="Search existing Chats..."
          spellCheck={false}
          required={true}
          className="peer rounded-2xl bg-[#2e333d] py-4 pl-12 pr-11 mx-2 w-full placeholder-gray-400 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FiSearch className="peer-focus:text-white h-7 w-7 absolute left-6 text-gray-400" />
        <CiCircleRemove
          className="peer-focus:text-red-300 h-6 w-6 absolute right-8 text-gray-400"
          onClick={() => setSearchQuery("")}
        />
      </form>
      {filteredChats.length === 0 ? (
        <h1 className="flex flex-col justify-center items-center px-4 h-full overflow-scroll text-white">
          No Chats... Start a new one!
        </h1>
      ) : (
        <div className="flex flex-col px-4 mt-2 space-y-1 mb-12 overflow-scroll">
          {filteredChats.map((chatObj, index) => (
            <ChatCardDesktop
              key={index}
              data={chatObj}
              chat={props.chat}
              setChat={props.setChat}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatsDesktop;

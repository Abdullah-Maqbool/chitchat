import SideNav from "../components/navigation/SideNav";
import ChatsDesktop from "../components/desktop/ChatsDesktop";
import { lazy, Suspense } from "react";
const FriendsListDesktop = lazy(() =>
  import("../components/desktop/FriendsListDesktop")
);
const AddFriend = lazy(() => import("../components/AddFriend"));
const TextingDesktop = lazy(() =>
  import("../components/desktop/TextingDesktop")
);
import { useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

// Add new chat to chat list if doesn't exist

const ChitChatDesktop = ({ socket }) => {
  const [activeNav, setActiveNav] = useState("chat");
  const [activeChat, setActiveChat] = useState("");

  return (
    <div className="w-full h-screen font-Archivo bg-[#131313] overflow-hidden">
      <SideNav Nav={activeNav} setNav={setActiveNav} />
      <div className="py-2 pr-2 ml-20 h-full">
        <div className="bg-[#202329] flex flex-row rounded-2xl h-full pt-4">
          {activeNav === "chat" ? (
            <ChatsDesktop chat={activeChat} setChat={setActiveChat} />
          ) : null}
          {activeNav === "friends" ? (
            <Suspense
              fallback={
                <div className="bg-[#202329] w-full h-screen flex justify-center items-center">
                  <PacmanLoader color="white" speedMultiplier={2} />
                </div>
              }
            >
              <FriendsListDesktop
                setChat={setActiveChat}
                setNav={setActiveNav}
              />
            </Suspense>
          ) : null}
          {activeNav === "addFriend" ? (
            <Suspense
              fallback={
                <div className="bg-[#202329] w-full h-screen flex justify-center items-center">
                  <PacmanLoader color="white" speedMultiplier={2} />
                </div>
              }
            >
              <AddFriend />
            </Suspense>
          ) : null}
          {activeNav === "groupChat" ? (
            <div className="flex flex-col items-center justify-center w-full h-screen pb-24 gap-8">
              <h1 className="text-8xl font-bold text-gray-100">GROUP CHATS</h1>
              <p className="text-2xl text-gray-300">Coming Soon!</p>
              <p className="text-lg text-gray-200 px-2">
                This feature is currently under development. It will be
                available soon.
              </p>
              <a
                href="https://www.youtube.com/watch?v=M1W8G_etmwk"
                target="_blank"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300"
              >
                Learn More
              </a>
            </div>
          ) : null}
          {activeNav === "chat" || activeNav === "friends" ? (
            <Suspense
              fallback={
                <div className="bg-[#202329] w-full h-screen flex justify-center items-center">
                  <PacmanLoader color="white" speedMultiplier={2} />
                </div>
              }
            >
              <TextingDesktop
                chat={activeChat}
                setChat={setActiveChat}
                socket={socket}
              />
            </Suspense>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChitChatDesktop;

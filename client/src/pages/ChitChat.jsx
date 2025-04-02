import { lazy, Suspense } from "react";
import BottomNav from "../components/navigation/BottomNav";
import Chats from "../components/Chats";
const AddFriend = lazy(() => import("../components/AddFriend"));
const GroupChats = lazy(() => import("../components/GroupChats"));
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ChitChatDesktop from "./ChitChatDesktop";
import api from "../axiosClient";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../features/user/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useSelector } from "react-redux";

import io from "socket.io-client";
const socket = io("http://localhost:3173");

socket.on("connect", () => {
  console.log("Connected to socket server");
});

// Pass down socket and handle it in Mobile view as well

// Define breakpoints
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1023 });
  return isDesktop ? children : null;
};

const Smaller = ({ children }) => {
  const isSmaller = useMediaQuery({ maxWidth: 1023 });
  return isSmaller ? children : null;
};

const ChitChat = () => {
  const [activeNav, setActiveNav] = useState("chat");
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(true);

  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    const fetchUser = async () => {
      await api
        .get("/auth/fetchUser")
        .then((res) => {
          const { user } = res.data;
          dispatch(setUserInfo(user));
          setFetching(false);
        })
        .catch((err) => {
          toast.info("Error fetching User data");
          console.error("Error Fetching User data: ", err);
          setFetching(false);
          navigate("/login");
        });
    };

    socket.emit("login", username);
    fetchUser();
  }, [dispatch, navigate]);

  const renderMainComponent = () => {
    switch (activeNav) {
      case "chat":
        return <Chats />;
      case "addFriend":
        return (
          <Suspense
            fallback={
              <div className="bg-[#202329] w-full h-screen flex justify-center items-center">
                <PacmanLoader color="white" speedMultiplier={2} />
              </div>
            }
          >
            <AddFriend />
          </Suspense>
        );
      case "groupChat":
        return (
          <Suspense
            fallback={
              <div className="bg-[#202329] w-full h-screen flex justify-center items-center">
                <PacmanLoader color="white" speedMultiplier={2} />
              </div>
            }
          >
            <GroupChats />
          </Suspense>
        );
      default:
        return <Chats />;
    }
  };

  return fetching === true ? (
    <div className="bg-[#202329] w-full h-screen flex justify-center items-center">
      <PacmanLoader color="white" speedMultiplier={2} />
    </div>
  ) : (
    <>
      <Smaller>
        <div className="w-full h-screen font-Archivo bg-[#202329]">
          <BottomNav onNavChange={setActiveNav} />
          {renderMainComponent()}
        </div>
      </Smaller>
      <Desktop>
        <ChitChatDesktop socket={socket} />
      </Desktop>
    </>
  );
};

export default ChitChat;

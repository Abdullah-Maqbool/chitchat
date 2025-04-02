import { useEffect, useState, useRef } from "react";
import Requests from "./Requests";
import { BsSendPlus } from "react-icons/bs";
import { CiCircleChevDown } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { setFriendRequests } from "../features/user/userSlice";
import api from "../axiosClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFriend = () => {
  const dispatch = useDispatch();

  const usernameRef = useRef(null);

  useEffect(() => {
    api
      .get("/request/")
      .then((res) => {
        const { friendRequests } = res.data;
        dispatch(setFriendRequests(friendRequests));
      })
      .catch((err) => {
        console.error("Error Fetching Requests: ", err);
        toast.error("Error Fetching Requests");
      });
  }, [dispatch]);

  const [activeRequest, setActiveRequest] = useState("requests");

  const switchRequests = () => {
    if (activeRequest === "requests") {
      setActiveRequest("pending");
    } else {
      setActiveRequest("requests");
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    api
      .post("/request/", { friendUsername: username })
      .then((res) => {
        toast.success("Friend Request Sent");
        console.log(res.data);
        usernameRef.current.value = "";
      })
      .catch((err) => {
        console.error("Error Sending Friend Request: ", err);
        toast.error(err.response.data.error);
      });
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <h1 className="text-4xl text-center py-3 font-Honk lg:hidden">
        Add Friends
      </h1>
      <form className="flex flex-row items-center px-6 py-2">
        <input
          type="text"
          placeholder="Find Friends with username..."
          spellCheck={false}
          required={true}
          pattern="^[a-zA-Z0-9._\-]{5,16}$"
          className="w-full rounded-2xl bg-[#2e333d] placeholder-gray-400 text-white py-4 px-4 mr-2"
          ref={usernameRef}
        />
        <button type="submit" onClick={handleAdd} className="w-12 h-12">
          <BsSendPlus className="h-8 w-8 ml-1 fill-cyan-300 mt-1 hover:animate-pulse" />
        </button>
      </form>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl text-center text-white mt-3 ml-5">
          {activeRequest === "requests"
            ? "Friend Requests"
            : "Pending Requests"}
        </h2>
        <div className="flex flex-row-reverse items-center mt-3 mr-5">
          <h3
            className="text-cyan-300 cursor-pointer hover:text-cyan-500"
            onClick={switchRequests}
          >
            {activeRequest === "requests"
              ? "Pending Requests"
              : "Friend Requests"}
          </h3>
          <CiCircleChevDown className="fill-cyan-300 mr-1" />
        </div>
      </div>
      {activeRequest === "pending" ? (
        <Requests pending={true} />
      ) : (
        <Requests pending={false} />
      )}
    </div>
  );
};

export default AddFriend;

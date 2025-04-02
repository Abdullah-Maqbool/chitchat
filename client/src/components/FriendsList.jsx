// To start new chat or open existing chat
import UserCard from "./cards/UserCard";
import { FiSearch } from "react-icons/fi";
import { CiCircleRemove } from "react-icons/ci";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "../axiosClient";
import { setFriends } from "../features/user/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// In actual scenario, fetch friends from the server
const FriendsList = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.user.friends);
  // const friends = [
  //   {
  //     displayName: "John Doe",
  //     avatar: "/avatar.jpg",
  //     username: "johndoe123",
  //   },
  //   ...
  // ];

  useEffect(() => {
    api
      .get("/friend/")
      .then((res) => {
        const { friends } = res.data;
        dispatch(setFriends(friends));
      })
      .catch((err) => {
        toast.error("Error fetching friends");
        console.error("Error fetching friends", err);
      });
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState("");

  // Sort friends alphabetically by displayName
  const sortedFriends = friends.sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
  );

  // Filter friends based on search query
  const filteredFriends = sortedFriends.filter((friend) =>
    friend.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-screen font-Archivo bg-[#202329] flex flex-col">
      <div className="grid grid-cols-[1fr,4fr,1fr] items-center py-4">
        <Link to="/chat" className="col-span-1 pl-6">
          <IoChevronBackCircleOutline className="w-9 h-9 text-white col-span-1" />
        </Link>
        <h1 className="text-4xl font-Honk text-center">Friends</h1>
        <div className="col-span-1"></div>
      </div>
      <form className="flex flex-row items-center px-4 py-2">
        <FiSearch className="h-7 w-7 absolute left-9 text-gray-400" />
        <input
          type="text"
          placeholder="Search Friends..."
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
      {filteredFriends.length === 0 ? (
        <h1 className="flex flex-col justify-center items-center px-4 h-full mb-4 overflow-scroll text-white">
          No Friends Found... Add some!
        </h1>
      ) : (
        <div className="flex flex-col px-4 mt-4 space-y-3 mb-4 overflow-scroll">
          {filteredFriends.map((chat, index) => (
            <Link key={index} to={`/chat/${chat.username}`}>
              <UserCard data={chat} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsList;

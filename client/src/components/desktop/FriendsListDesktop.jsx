// To start new chat or open existing chat
import UserCardDesktop from "./UserCardDesktop";
import { FiSearch } from "react-icons/fi";
import { CiCircleRemove } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../axiosClient";
import { setFriends } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// In actual scenario, fetch friends from the server
const FriendsListDesktop = (props) => {
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
        dispatch(setFriends([...friends]));
      })
      .catch((err) => {
        toast.error("Error fetching friends");
        console.error("Error fetching friends", err);
      });
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState("");

  // Sort friends alphabetically by displayName
  const sortedFriends = [...friends].sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
  );

  // Filter friends based on search query
  const filteredFriends = sortedFriends.filter((friend) =>
    friend.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-w-[30%] h-screen pl-2">
      <form className="flex flex-row items-center px-2 py-2">
        <input
          type="text"
          placeholder="Search Friends..."
          spellCheck={false}
          required={true}
          className="peer rounded-2xl bg-[#2e333d] py-4 pl-12 pr-11 mx-2 w-full placeholder-gray-400 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FiSearch className="peer-focus:text-white h-7 w-7 absolute left-28 text-gray-400" />
        <CiCircleRemove
          className="peer-focus:text-red-300 h-6 w-6 absolute left-[30%] text-gray-400"
          onClick={() => setSearchQuery("")}
        />
      </form>
      {filteredFriends.length === 0 ? (
        <h1 className="flex flex-col justify-center items-center px-4 h-full overflow-scroll text-white">
          No Friends Found... Add some!
        </h1>
      ) : (
        <div className="flex flex-col px-4 mt-2 space-y-3 mb-12 overflow-scroll">
          {filteredFriends.map((friend, index) => (
            <UserCardDesktop
              key={index}
              data={friend}
              setChat={props.setChat}
              setNav={props.setNav}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsListDesktop;

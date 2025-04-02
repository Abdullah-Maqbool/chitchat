// For Requests List
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { removeFriendRequest } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../axiosClient";

const RequestCard = (props) => {
  const dispatch = useDispatch();

  const handleAddFriend = (e) => {
    e.preventDefault();
    api
      .post("/friend/", { friendUsername: props.data.username })
      .then((res) => {
        console.log(res.data);
        toast.info("Friend Added!");
        dispatch(removeFriendRequest({ username: props.data.username }));
      })
      .catch((err) => {
        console.error("Error Adding Friend: ", err);
        toast.info(err.response.data.error);
      });
  };

  const handleRemoveRequest = (e) => {
    e.preventDefault();
    const username = props.data.username;
    api
      .delete(`/request/${username}`)
      .then((res) => {
        console.log(res.data);
        toast.info("Request Removed!");
        dispatch(removeFriendRequest({ username: props.data.username }));
      })
      .catch((err) => {
        console.error("Error Removing Request: ", err);
      });
  };

  return (
    <div className="flex flex-row items-center justify-between rounded-3xl bg-[#2e333d] py-4 px-4 border-transparent border-2 border-solid hover:border-white">
      <div className="flex flex-row items-center">
        <img
          src={props.data.avatar}
          alt="avatar"
          className="rounded-2xl w-14 h-14"
        />
        <div className="flex flex-col mt-1">
          <h1 className="text-white text-xl font-medium ml-3">
            {props.data.displayName}
          </h1>
          <h1 className="text-gray-400 text-base ml-3">
            ID: {props.data.username}
          </h1>
        </div>
      </div>
      <div className="flex flex-row">
        {props.pending === true ? (
          <></>
        ) : (
          <CiCircleCheck
            onClick={handleAddFriend}
            className="fill-green-400 w-10 h-10 mr-1 cursor-pointer hover:fill-green-600"
          />
        )}
        <CiCircleRemove
          onClick={handleRemoveRequest}
          className="fill-red-500 w-10 h-10 cursor-pointer hover:fill-red-700"
        />
      </div>
    </div>
  );
};

export default RequestCard;

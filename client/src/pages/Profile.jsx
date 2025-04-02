import { useEffect } from "react";
import api from "../axiosClient";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../features/user/userSlice";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

//Responsiveness Fix
//Handle API calls
//Handle Change Password

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get("/profile")
      .then((res) => {
        const { user } = res.data;
        console.log(user);
        dispatch(updateUserInfo(user));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [dispatch]);

  return (
    <div className="bg-[#202329] flex flex-col w-full h-screen overflow-hidden lg:px-20 lg:pt-10">
      <Link to="/chat">
        <IoIosArrowBack className="w-14 h-14 text-white hover:text-gray-300 border-2 rounded-full pr-1 mb-4 ml-4 mt-4" />
      </Link>
      <div className="lg:px-20">
        <div className="bg-[#2e333d] flex justify-center items-center p-4 rounded-xl shadow-2xl lg:px-40">
          <form className="flex flex-col w-full lg:px-40">
            <div className="bg-[#6b8afd] hover:bg-[#446bfa] w-20 h-20 p-1 rounded-full self-center">
              <img
                className="w-full h-full rounded-full"
                src={user.avatar}
                alt="avatar"
              />
            </div>
            <label
              htmlFor="email"
              className="text-white text-lg ml-4 mb-1 mt-4"
            >
              E-mail
            </label>
            <input
              className="placeholder-white relative w-full bg-transparent border-2 border-black focus:border-white border-solid rounded-full text-xl text-white shadow-none outline-none py-3 px-5"
              type="email"
              name="email"
              id="email"
              placeholder={user.email}
              required={true}
              spellCheck={false}
            />
            <label
              htmlFor="username"
              className="text-white text-lg ml-4 mb-1 mt-4"
            >
              Username
            </label>
            <input
              className="placeholder-white relative w-full bg-transparent border-2 border-black focus:border-white border-solid rounded-full text-xl text-white shadow-none outline-none py-3 pl-5 pr-12"
              type="text"
              name="username"
              id="username"
              placeholder={user.username}
              required={true}
              spellCheck={false}
              minLength={5}
              maxLength={16}
              pattern="^[a-zA-Z0-9._\-]{5,16}$"
              title="Check Instructions for more details"
            />
            <label
              htmlFor="displayName"
              className="text-white text-lg ml-4 mb-1 mt-4"
            >
              Display Name
            </label>
            <input
              className="placeholder-white relative w-full bg-transparent border-2 border-black focus:border-white border-solid rounded-full text-xl text-white shadow-none outline-none py-3 pl-5 pr-12"
              type="text"
              name="displayName"
              id="displayName"
              placeholder={user.displayName}
              required={true}
              spellCheck={false}
              minLength={1}
              maxLength={24}
              pattern="^[a-zA-Z\s]{1,24}$"
              title="Check Instructions for more details"
            />
            <div className="flex flex-row justify-center gap-6 mt-6 mb-4 text-white text-lg">
              <button className="bg-[#6b8afd] p-2 w-40 rounded-lg hover:rounded-3xl duration-300">
                Save Changes
              </button>
              <button className="bg-[#6b8afd] p-2 w-44 rounded-lg hover:rounded-3xl duration-300">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import api from "../axiosClient.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const myCookieValue = Cookies.get("jwt_auth");
    if (myCookieValue) {
      toast.info("You are already logged in");
      navigate("/chat");
    }
  }, [navigate]);

  const [hidePassword, setHidePassword] = useState("password");

  const togglePassword = () => {
    if (hidePassword === "password") {
      setHidePassword("text");
    } else {
      setHidePassword("password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    api
      .post(
        "/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Logged in successfully");
        setTimeout(() => {
          toast.info("Redirecting to Chats...");
        }, 1000);
        setTimeout(() => {
          navigate("/chat");
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to login");
      });
  };

  return (
    <div className="m-0 p-0 box-border font-Quicksand">
      <Link to="/">
        <AiFillHome className="fixed top-6 left-10 w-12 h-12 text-white border-2 rounded-full p-2" />
      </Link>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-0% from-[#4158D0] to-100% to-[#FFCC70] w-full overflow-hidden">
        <div className="group relative w-[600px] h-[600px] flex justify-center items-center">
          <i className="hidden sm:block absolute inset-0 duration-[0.5s] bg-[#0093E9] bg-gradient-to-r from-0% from-[#43e97b] to-100% to-[#38f9d7] [border-radius:38%_62%_63%_37%_/_41%_44%_56%_59%] animate-[animate1_6s_linear_infinite] group-hover:drop-shadow-[0_0_30px_#43e97b]"></i>
          <i className="hidden sm:block absolute inset-0 duration-[0.5s] bg-[#0093E9] bg-gradient-to-tl from-0% from-[#0093E9] to-100% to-[#80D0C7] [border-radius:41%_44%_56%_59%_/_38%_62%_63%_37%] animate-[animate1_4s_linear_infinite] group-hover:drop-shadow-[0_0_30px_#0093e9]"></i>
          <i className="hidden sm:block absolute inset-0 duration-[0.5s] bg-[#4158D0] bg-gradient-to-tr from-0% from-[#4158D0] via-46% via-[#C850C0] to-100% to-[#FFCC70] [border-radius:41%_44%_56%_59%_/_38%_62%_63%_37%] animate-[animate2_10s_linear_infinite] group-hover:drop-shadow-[0_0_30px_#4158d0]"></i>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="absolute w-80 sm:w-96 h-full flex justify-center items-center flex-col gap-5 mb-10 sm:mb-0"
          >
            <h2 className="text-4xl text-white">Login</h2>
            <div className="relative w-full">
              <input
                className="placeholder-white relative w-full bg-transparent border-2 border-black focus:border-white border-solid rounded-full text-xl text-white shadow-none outline-none py-3 px-5"
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                required={true}
                spellCheck={false}
              />
            </div>
            <div className="relative w-full">
              <input
                className="placeholder-white relative w-full bg-transparent border-2 border-black focus:border-white border-solid rounded-full text-xl text-white shadow-none outline-none py-3 px-5"
                type={hidePassword}
                name="password"
                id="password"
                placeholder="Password"
                required={true}
                minLength={8}
                maxLength={16}
                spellCheck={false}
              />
            </div>
            {hidePassword == "password" ? (
              <div
                onClick={togglePassword}
                className="relative self-start flex flex-row justify-start items-center ml-5 text-white cursor-pointer"
              >
                <FaEye className="w-8 h-6" />
                <p className="ml-2">Show Password</p>
              </div>
            ) : (
              <div
                onClick={togglePassword}
                className="relative self-start flex flex-row justify-start items-center ml-5 text-white cursor-pointer"
              >
                <FaEyeSlash className="w-8 h-6" />
                <p className="ml-2">Hide Password</p>
              </div>
            )}
            <div className="relative w-full">
              <input
                className="relative w-full bg-[#0078ff] bg-gradient-to-tr hover:bg-gradient-to-bl from-[#ff357a] to-[#fff172] border-none cursor-pointer rounded-full text-xl text-white shadow-none outline-none py-3 px-5"
                type="submit"
                value="Login"
              />
            </div>
            <div className="relative w-full flex items-center justify-between py-0 px-12">
              <Link
                className="text-white hover:text-black no-underline font-medium"
                to="/password-reset"
              >
                Forgot Password?
              </Link>
              <Link
                className="text-white hover:text-black no-underline font-medium"
                to="/register"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

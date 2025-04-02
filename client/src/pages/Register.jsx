// 400 lines in 1 file, I know this is madness but I'm trying...

import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import api from "../axiosClient.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [hidePassword, setHidePassword] = useState("password");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [phase, setPhase] = useState(1);

  const dialogRef = useRef();

  const [prevData, setPrevData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phase === 1) {
      const email = e.target.email.value;
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmPassword.value;

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      await api
        .post("/email/sendOTP", {
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        })
        .then(() => {
          toast.success("OTP sent successfully");
          setPrevData({
            email: email,
            password: password,
          });
          setPhase(2);
        })
        .catch((err) => {
          if (
            err.response.data.message ===
            "An account with this email already exists"
          ) {
            toast.error("An account with this email already exists");
          } else {
            toast.error("Failed to send OTP");
          }
        });
    } else if (phase === 2) {
      const OTP = e.target.OTP.value;

      if (OTP.length !== 6) {
        toast.error("OTP must consist of exactly 6 digits");
        return;
      }

      await api
        .post("/email/verifyOTP", {
          email: prevData.email,
          OTP: OTP,
        })
        .then(() => {
          toast.success("Email verified successfully");
          setPhase(3);
        })
        .catch((err) => {
          if (
            err.response.data.message ===
            "OTP not found for " + prevData.email
          ) {
            toast.error("OTP not found for " + prevData.email);
          } else if (
            err.response.data.message ===
            "OTP must be exactly 6 characters long"
          ) {
            toast.error("Error : Bad Request");
          } else if (err.response.data.message === "Invalid OTP") {
            toast.error("Invalid OTP");
          } else {
            toast.error("Failed to verify");
          }
        });
    } else if (phase === 3) {
      const data = {
        username: e.target.username.value,
        displayName: e.target.displayName.value,
        avatar: selectedAvatar,
      };

      await api
        .post("/auth/register", {
          ...prevData,
          ...data,
        })
        .then(() => {
          toast.success("User registered successfully");
          setTimeout(() => {
            navigate("/login");
            toast.info("Please login to continue");
          }, 1000);
        })
        .catch((err) => {
          if (err.response.data.message === "Username already taken") {
            toast.error("Username already taken");
          } else if (
            err.response.data.error === "Bad Request : Validation Failed"
          ) {
            toast.error("Bad Request : Validation Failed");
          } else {
            toast.error("Failed to register user");
          }
        });
    }
  };

  const toggleDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  const togglePassword = () => {
    if (hidePassword === "password") {
      setHidePassword("text");
    } else {
      setHidePassword("password");
    }
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
          {phase === 1 ? (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="absolute w-80 sm:w-96 h-full flex justify-center items-center flex-col gap-5 mb-10 sm:mb-0"
            >
              <h2 className="text-4xl text-white mb-14 sm:mb-0">Register</h2>
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
              <div className="relative w-full">
                <input
                  className="placeholder-white relative w-full bg-transparent border-2 border-black focus:border-white border-solid rounded-full text-xl text-white shadow-none outline-none py-3 px-5"
                  type={hidePassword}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
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
                  value="Send OTP"
                />
              </div>
              <div className="relative w-full flex items-center justify-around py-0 px-5">
                <Link
                  className="text-white hover:text-black no-underline font-medium"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </div>
              <div className="relative w-full">
                <p className="text-center font-medium">Step {phase} of 3</p>
              </div>
            </form>
          ) : (
            <></>
          )}
          {/* Add Resend OTP Button */}
          {phase === 2 ? (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="absolute w-80 sm:w-96 h-full flex justify-center items-center flex-col gap-5 mb-10 sm:mb-0"
            >
              <h2 className="text-4xl text-white mb-14 sm:mb-0">
                Email Verification
              </h2>
              <div className="relative w-full py-10">
                <input
                  className="placeholder-gray-100 relative w-full bg-transparent border-2 border-black focus:border-white border-solid rounded-full text-xl text-white shadow-none outline-none py-3 px-5 text-center"
                  type="number"
                  name="OTP"
                  id="OTP"
                  placeholder="Enter OTP"
                  required={true}
                  spellCheck={false}
                />
              </div>
              <div className="relative w-full px-16">
                <input
                  className="relative w-full bg-[#0078ff] bg-gradient-to-tr hover:bg-gradient-to-bl from-[#ff357a] to-[#fff172] border-none cursor-pointer rounded-full text-xl text-white shadow-none outline-none py-3 px-5"
                  type="submit"
                  value="Verify"
                />
              </div>
              <div className="relative w-full">
                <p className="text-center font-medium">Step {phase} of 3</p>
              </div>
            </form>
          ) : (
            <></>
          )}
          {phase === 3 ? (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="absolute w-80 sm:w-96 h-full flex justify-center items-center flex-col gap-5 mb-10 sm:mb-0"
            >
              <h2 className="text-4xl text-white mb-14 sm:mb-2">
                Personal Info
              </h2>
              <h3 className="text-white">Choose your avatar</h3>
              <div className="relative w-full flex justify-around items-center pr-6">
                <label htmlFor="avatar" className="flex cursor-pointer">
                  <input
                    className="peer"
                    type="radio"
                    name="radioGroup"
                    value="/avatar.jpg"
                    id="avatar"
                    onChange={(e) => setSelectedAvatar(e.target.value)}
                    required={true}
                  />
                  <img
                    src="/avatar.jpg"
                    alt="avatar"
                    className="w-14 h-14 rounded-2xl ml-2 border-0 border-blue-400 border-solid peer-checked:border-2 peer-checked:w-16 peer-checked:h-16"
                  />
                </label>
                <label htmlFor="avatarF" className="flex cursor-pointer">
                  <input
                    className="peer"
                    type="radio"
                    name="radioGroup"
                    value="/avatarF.png"
                    id="avatarF"
                    onChange={(e) => setSelectedAvatar(e.target.value)}
                    required={true}
                  />
                  <img
                    src="/avatarF.png"
                    alt="avatarF"
                    className="w-14 h-14 rounded-2xl ml-2 border-0 border-blue-400 border-solid peer-checked:border-2 peer-checked:w-16 peer-checked:h-16"
                  />
                </label>
              </div>
              <div className="relative w-full">
                <input
                  className="placeholder-white relative w-full bg-transparent border-2 border-black focus:border-white border-solid rounded-full text-xl text-white shadow-none outline-none py-3 pl-5 pr-12"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  required={true}
                  spellCheck={false}
                  minLength={5}
                  maxLength={16}
                  pattern="^[a-zA-Z0-9._\-]{5,16}$"
                  title="Check Instructions for more details"
                />
              </div>
              <div className="relative w-full">
                <input
                  className="placeholder-white relative w-full bg-transparent border-2 border-black focus:border-white border-solid rounded-full text-xl text-white shadow-none outline-none py-3 pl-5 pr-12"
                  type="text"
                  name="displayName"
                  id="displayName"
                  placeholder="Display Name"
                  required={true}
                  spellCheck={false}
                  minLength={1}
                  maxLength={24}
                  pattern="^[a-zA-Z\s]{1,24}$"
                  title="Check Instructions for more details"
                />
              </div>
              <div className="relative w-full pl-6 text-white">
                <div
                  className="flex items-center cursor-pointer w-fit"
                  onClick={toggleDialog}
                >
                  <FiInfo className="w-4 h-4 mr-2" />
                  <h4>Instructions</h4>
                </div>
              </div>
              <div className="relative w-full px-16">
                <input
                  className="relative w-full bg-[#0078ff] bg-gradient-to-tr hover:bg-gradient-to-bl from-[#ff357a] to-[#fff172] border-none cursor-pointer rounded-full text-xl text-white shadow-none outline-none py-3 px-5"
                  type="submit"
                  value="Submit"
                />
              </div>
              <div className="relative w-full">
                <p className="text-center font-medium">Step {phase} of 3</p>
              </div>
              <dialog
                ref={dialogRef}
                className="bg-black bg-opacity-95 text-white p-8 rounded-xl"
              >
                <h2 className="text-center text-xl font-bold mb-2">Username</h2>
                <p className="py-2">
                  Username is your Account&apos;s ID which can be used to find
                  you on ChitChat.
                </p>
                <h3>Username may include: </h3>
                <ul className="list-disc list-inside">
                  <li>Alphanumeric characters (a-z), (A-Z), (0-9)</li>
                  <li>
                    Symbols including periods (.), underscores (_), and hyphens
                    (-)
                  </li>
                  <li>No spaces or Other special characters</li>
                </ul>
                <h2 className="text-center text-xl font-bold my-2">
                  Display Name
                </h2>
                <p className="py-2">
                  Display Name is the name that will be shown to others on
                  ChitChat.
                </p>
                <h3>Display Name may include: </h3>
                <ul className="list-disc list-inside">
                  <li>Alphabet characters (a-z), (A-Z)</li>
                  <li>Spaces</li>
                  <li>No Numbers or Other special characters</li>
                </ul>
                <div className="flex justify-around">
                  <button
                    className="rounded-xl bg-[#6b8afd] py-2 px-4 mt-4"
                    onClick={toggleDialog}
                  >
                    Understood
                  </button>
                </div>
              </dialog>
            </form>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;

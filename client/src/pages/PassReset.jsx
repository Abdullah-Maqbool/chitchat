import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import api from "../axiosClient.js";
import { useNavigate } from "react-router-dom";

const PassReset = () => {
  const navigate = useNavigate();

  const [hidePassword, setHidePassword] = useState("password");
  const [selectedMethod, setSelectedMethod] = useState("email");
  const [phase, setPhase] = useState(1);

  const [userData, setUserData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phase === 1) {
      if (selectedMethod === "email") {
        const email = e.target.email.value;

        await api
          .post("/password-reset/resetOTP", {
            email: email,
          })
          .then((res) => {
            toast.success(`OTP sent to ${res.data.email}`);
            setUserData(res.data.email);
            setPhase(2);
          })
          .catch((err) => {
            if (err.response.data.error === "Bad Request : Validation Failed") {
              toast.error("Bad Request : Validation Failed");
            } else if (
              err.response.data.message ===
              "This email/username is not registered on ChitChat"
            ) {
              toast.error("This email/username is not registered on ChitChat");
            } else {
              console.log(err);
              toast.error("Failed to generate and send OTP");
            }
          });
      } else if (selectedMethod === "username") {
        const username = e.target.username.value;

        await api
          .post("/password-reset/resetOTP", {
            username: username,
          })
          .then((res) => {
            toast.success("OTP sent successfully");
            setUserData(res.data.email);
            setPhase(2);
          })
          .catch((err) => {
            if (err.response.data.error === "Bad Request : Validation Failed") {
              toast.error("Bad Request : Validation Failed");
            } else if (
              err.response.data.message ===
              "This email/username is not registered on ChitChat"
            ) {
              toast.error("This email/username is not registered on ChitChat");
            } else {
              console.log(err);
              toast.error("Failed to generate and send OTP");
            }
          });
      }
    } else if (phase === 2) {
      const OTP = e.target.OTP.value;

      if (OTP.length !== 6) {
        toast.error("OTP must consist of exactly 6 digits");
        return;
      }

      await api
        .post("/password-reset/verifyOTP", {
          email: userData,
          OTP: OTP,
        })
        .then(() => {
          toast.success("Verified User");
          setPhase(3);
        })
        .catch((err) => {
          if (err.response.data.message === "OTP not found for " + userData) {
            toast.error("OTP not found for " + userData);
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
        email: userData,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value,
      };

      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      await api
        .patch("/password-reset", data)
        .then(() => {
          toast.success("Password Reset successful");
          setTimeout(() => {
            navigate("/login");
            toast.info("Please login to continue");
          }, 1000);
        })
        .catch((err) => {
          if (err.response.data.message === "Unable to find the user") {
            toast.error("Unable to find the user");
          } else if (
            err.response.data.error === "Bad Request : Validation Failed"
          ) {
            toast.error("Bad Request : Validation Failed");
          } else {
            toast.error("Failed to reset Password");
          }
        });
    }
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
              <h2 className="text-4xl text-white mb-14 sm:mb-6">
                Reset Password
              </h2>
              <div className="relative w-full flex justify-around items-center pr-6">
                <label
                  htmlFor="emailRadio"
                  className="flex cursor-pointer text-white text-lg"
                >
                  <input
                    className="mr-1"
                    type="radio"
                    name="radioGroup"
                    value="email"
                    id="emailRadio"
                    onChange={(e) => {
                      setSelectedMethod(e.target.value);
                      console.log(selectedMethod);
                    }}
                    required={true}
                    checked={selectedMethod === "email"}
                  />
                  E-mail
                </label>
                <label
                  htmlFor="usernameRadio"
                  className="flex cursor-pointer text-white text-lg"
                >
                  <input
                    className="mr-1"
                    type="radio"
                    name="radioGroup"
                    value="username"
                    id="usernameRadio"
                    onChange={(e) => {
                      setSelectedMethod(e.target.value);
                      console.log(selectedMethod);
                    }}
                    required={true}
                  />
                  Username
                </label>
              </div>
              {selectedMethod === "email" ? (
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
              ) : (
                <></>
              )}
              {selectedMethod === "username" ? (
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
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="relative w-full flex items-center justify-around py-0 px-5">
                <Link
                  className="text-white hover:text-black no-underline font-medium"
                  to="/login"
                >
                  Remember the credentials? Login
                </Link>
              </div>
              <div className="relative w-full">
                <input
                  className="relative w-full bg-[#0078ff] bg-gradient-to-tr hover:bg-gradient-to-bl from-[#ff357a] to-[#fff172] border-none cursor-pointer rounded-full text-xl text-white shadow-none outline-none py-3 px-5"
                  type="submit"
                  value="Send OTP"
                />
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
                OTP Verification
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
            </form>
          ) : (
            <></>
          )}
          {phase === 3 ? (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="absolute w-80 sm:w-96 h-full flex justify-center items-center flex-col gap-5 mb-10 sm:mb-0"
            >
              <h2 className="text-4xl text-white mb-14 sm:mb-6">
                New Password
              </h2>
              <div className="relative w-full">
                <input
                  className="placeholder-white relative w-full bg-transparent border-2 border-black focus:border-white border-solid rounded-full text-xl text-white shadow-none outline-none py-3 px-5"
                  type={hidePassword}
                  name="password"
                  id="password"
                  placeholder="New Password"
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
                  placeholder="Confirm New Password"
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
                  value="Reset Password"
                />
              </div>
            </form>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassReset;

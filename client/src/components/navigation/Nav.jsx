import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Nav = () => {
  const navLinks = [
    { name: "Featured", to: "featured" },
    { name: "Contact", to: "contact" },
    { name: "About", to: "about" },
  ];

  const [myCookie, setMyCookie] = useState(null);

  const handleLogout = () => {
    Cookies.remove("jwt_auth");
    setMyCookie(null);
  };

  useEffect(() => {
    setMyCookie(Cookies.get("jwt_auth"));
  }, []);

  const [showNavMenu, setShowNavMenu] = useState(false);

  const handleNavMenu = () => {
    setShowNavMenu(true);
  };

  return (
    <nav className="m-0 p-0 box-border font-Quicksand">
      <div className="flex flex-row justify-between items-center w-full h-20 bg-transparent">
        <ScrollLink
          to="hero"
          smooth={true}
          duration={500}
          className="cursor-pointer flex text-4xl text-white font-Honk ml-5"
        >
          {/* Logo to be replaced later */}
          <img src="/icon.ico" alt="logo" className="w-10 h-10" />
          ChitChat
        </ScrollLink>
        <ul className="hidden md:flex w-full justify-evenly text-white text-4xl font-Honk">
          {navLinks.map((link, index) => (
            <li key={index}>
              <ScrollLink
                to={link.to}
                smooth={true}
                duration={500}
                className="cursor-pointer"
              >
                {link.name}
              </ScrollLink>
            </li>
          ))}
        </ul>
        <div className="flex mr-4">
          {myCookie === null || myCookie === undefined ? (
            <Link
              to="/login"
              className="border-black text-black font-medium h-9 md:h-11 w-20 md:w-24 rounded-xl hover:rounded-3xl duration-300 px-4 md:px-6 py-1 md:py-1 md:text-lg border-2 bg-gradient-to-tr from-[#ff357a] to-[#fff172] mt-1 mr-5"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="border-black text-black font-medium h-9 md:h-11 w-20 md:w-24 rounded-xl hover:rounded-3xl duration-300 px-3 md:px-4 py-1 md:py-1 md:text-lg border-2 bg-gradient-to-tr from-[#ff357a] to-[#fff172] mt-1 mr-5"
            >
              Logout
            </button>
          )}
          {showNavMenu ? (
            <IoClose
              className="w-10 h-10 text-white md:hidden"
              onClick={() => setShowNavMenu(false)}
            />
          ) : (
            <IoMenu
              className="w-10 h-10 text-white md:hidden"
              onClick={handleNavMenu}
            />
          )}
          <div
            className={
              showNavMenu
                ? "fixed right-0 top-0 w-full h-full bg-gradient-to-b from-0% from-[#4158D0] to-100% to-[#FFCC70] ease-in-out duration-500 md:hidden z-[999]"
                : "fixed right-[-100%] top-0 w-full h-full bg-gradient-to-b from-0% from-[#4158D0] to-100% to-[#FFCC70] ease-in-out duration-500 md:hidden z-[999]"
            }
          >
            {showNavMenu && (
              <IoClose
                className="w-10 h-10 text-white md:hidden fixed top-5 right-5"
                onClick={() => setShowNavMenu(false)}
              />
            )}
            <ul className="flex flex-col items-center h-[70%] mt-32 gap-4">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <ScrollLink
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className="cursor-pointer text-4xl text-white font-Honk"
                    onClick={() => setShowNavMenu(false)}
                  >
                    {link.name}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

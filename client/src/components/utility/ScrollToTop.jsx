import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <aside>
      {isVisible && (
        <button
          className="fixed bottom-10 right-10 hover:bg-[rgba(255,241,114,0.89)] text-black font-bold py-2 px-4 rounded-full bg-[#fff172] z-[999] animate-bounce hover:animate-none"
          onClick={scrollToTopHandler}
        >
          <FaArrowUp />
        </button>
      )}
    </aside>
  );
};

export default ScrollToTop;

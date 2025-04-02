import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const myCookieValue = Cookies.get("jwt_auth");

  if (myCookieValue) {
    return children;
  } else {
    toast.info("You must be logged in to access this page.");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

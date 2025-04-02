import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./Routing";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <Routing />
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
        transition:Zoom
      />
    </>
  );
}

export default App;

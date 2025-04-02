import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "./pages/Home";
const ChitChat = lazy(() => import("./pages/ChitChat"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const PassReset = lazy(() => import("./pages/PassReset"));
const Profile = lazy(() => import("./pages/Profile"));
const Page404 = lazy(() => import("./pages/Page404"));
const Texting = lazy(() => import("./components/Texting"));
const FriendsList = lazy(() => import("./components/FriendsList"));
import PacmanLoader from "react-spinners/PacmanLoader";
import ProtectedRoute from "./ProtectedRoute";

export default function Routing() {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <Suspense
            fallback={
              <div className="bg-[#202329] w-full h-screen flex justify-center items-center">
                <PacmanLoader color="white" speedMultiplier={2} />
              </div>
            }
          >
            <Home />
          </Suspense>
        }
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Suspense
              fallback={
                <div className="bg-[#202329] w-full h-screen flex justify-center items-center">
                  <PacmanLoader color="white" speedMultiplier={2} />
                </div>
              }
            >
              <ChitChat />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat/:id"
        element={
          <ProtectedRoute>
            <Suspense
              fallback={
                <div className="bg-[#202329] w-full h-screen flex justify-center items-center">
                  <PacmanLoader color="white" speedMultiplier={2} />
                </div>
              }
            >
              <Texting />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="/friends"
        element={
          <ProtectedRoute>
            <Suspense
              fallback={
                <div className="bg-[#202329] w-full h-screen flex justify-center items-center">
                  <PacmanLoader color="white" speedMultiplier={2} />
                </div>
              }
            >
              <FriendsList />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Suspense
              fallback={
                <div className="bg-[#202329] w-full h-screen flex justify-center items-center">
                  <PacmanLoader color="white" speedMultiplier={2} />
                </div>
              }
            >
              <Profile />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <Suspense
            fallback={
              <div className="bg-[#202329] w-full h-screen flex justify-center items-center">
                <PacmanLoader color="white" speedMultiplier={2} />
              </div>
            }
          >
            <Login />
          </Suspense>
        }
      />

      <Route
        path="/register"
        element={
          <Suspense
            fallback={
              <div className="bg-[#202329] w-full h-screen flex justify-center items-center">
                <PacmanLoader color="white" speedMultiplier={2} />
              </div>
            }
          >
            <Register />
          </Suspense>
        }
      />

      <Route
        path="/password-reset"
        element={
          <Suspense
            fallback={
              <div className="bg-[#202329] w-full h-screen flex justify-center items-center">
                <PacmanLoader color="white" speedMultiplier={2} />
              </div>
            }
          >
            <PassReset />
          </Suspense>
        }
      />

      <Route
        path="*"
        element={
          <Suspense
            fallback={
              <div className="bg-[#202329] w-full h-screen flex justify-center items-center">
                <PacmanLoader color="white" speedMultiplier={2} />
              </div>
            }
          >
            <Page404 />
          </Suspense>
        }
      />
    </Routes>
  );
}

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss";
import User from "./pages/User";
import { PostProvider } from "./context/postContex";

const Loyaut = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: (
      <h1
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        NOT FOUND
      </h1>
    ),
    element: <Loyaut />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: (
          <PostProvider>
            <Single />
          </PostProvider>
        ),
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;

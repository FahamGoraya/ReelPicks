import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { createContext } from "react";
import Login_page from "./pages/Login_Page.jsx";
import Movie_page from "./pages/Movie_page/Movie_page.jsx";
import Signup_page from "./pages/Signup_page/Signup.jsx";
import SearchPage from "./pages/Search_page/Search.jsx";
import RecommendPage from "./pages/Recommend_page/RecommendPage.jsx";
import About_Page from "./pages/About_page/About_Page.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login_page />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/home/:id/:type",
    element: <Movie_page />,
  },
  { path: "/signup", element: <Signup_page /> },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/recommend",
    element: <RecommendPage />,
  },
  {
    path: "/about",
    element: <About_Page />,
  },
]);

const R = () => {
  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(<R />);

import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { createContext } from "react";
import Login_page from "./pages/Login_Page.jsx";
import Movie_page from "./pages/Movie_page/Movie_page.jsx";

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
]);

const R = () => {
  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(<R />);

import React from "react";
import "./Header.css";
import { Link } from "react-router";
import { IoMdSearch } from "react-icons/io";
import { MdRecommend } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";
import { useNavigate } from "react-router";

const Header_move = () => {
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    try {
      const response = await fetch("http://localhost:3001/api/user/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="header-wrapper">
      <div className="header-gradient-line"></div>
      <header className="header-container">
        <Link to={"/home"} className="logo-link">
          <div className="logo">
            <h1 className="logo-text">
              <span className="logo-gi">Reel</span>
              <span className="logo-movies">Picks</span>
            </h1>
          </div>
        </Link>

        <nav className="nav-container">
          <div className="nav-links">
            <Link to={"/search"} className="nav-link">
              <button className="nav-button">
                <IoMdSearch className="nav-icon" />
                <span>Search</span>
              </button>
            </Link>
            <Link to={"/recommend"} className="nav-link">
              <button className="nav-button">
                <MdRecommend className="nav-icon" />
                <span>Recommend</span>
              </button>
            </Link>
            <Link to={"/about"} className="nav-link">
              <button className="nav-button">
                <IoIosInformationCircle className="nav-icon" />
                <span>About</span>
              </button>
            </Link>
            <button className="nav-button logout-button" onClick={handleLogout}>
              <IoLogOut className="nav-icon" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header_move;

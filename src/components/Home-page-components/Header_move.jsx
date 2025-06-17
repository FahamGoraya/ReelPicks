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
      const response = await fetch(
        "https://gimoviesbackend.onrender.com/api/user/logout",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
    <div className="cover">
      <header className="header-hbox">
        <Link to={"/home"}>
          <div className="logo">
            <h3 className="Footer_logo">GI Movies</h3>
          </div>
        </Link>

        <nav className="nav-links">
          <Link to={"/"}>
            <button className="nav-button">
              {" "}
              <IoMdSearch size={15} style={{ marginRight: "5px" }} />
              Search
            </button>
          </Link>
          <Link to={"/"}>
            <button className="nav-button">
              {" "}
              <MdRecommend size={16} style={{ marginRight: "5px" }} />
              Recommend me
            </button>
          </Link>
          <Link to={"/"}>
            <button className="nav-button">
              {"  "}
              <IoIosInformationCircle
                size={16}
                style={{ marginRight: "5px" }}
              />
              About
            </button>
          </Link>
          <button className="nav-buttonLogout" onClick={handleLogout}>
            {"  "}
            <IoLogOut size={16} style={{ marginRight: "5px" }} />
            Log out
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header_move;

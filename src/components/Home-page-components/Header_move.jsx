import "./Header.css";
import { Link } from "react-router";

const Header_move = () => {
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
            <button className="nav-button">Search</button>
          </Link>
          <Link to={"/"}>
            <button className="nav-button">Recommend me</button>
          </Link>
          <Link to={"/"}>
            <button className="nav-button">About</button>
          </Link>
          <Link to={"/"}>
            <button className="nav-button">Log out</button>
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Header_move;

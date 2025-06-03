import { useState, useEffect, useContext } from "react";
import Movies_service from "../service/Movies_service";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router";
import "./Login.css";
import Username from "../components/Login and sign up components/Username";
import Password from "../components/Login and sign up components/Password";

function Login_page() {
  const navigae = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    document.body.classList.add("Signup-bg");

    return () => {
      document.body.classList.remove("Signup-bg");
    };
  }, [loc]);

  const handle_importance = (event) => {
    navigae("/home");
  };

  return (
    <>
      <div className="wrapper">
        <h1 className="signtext">GI Movies</h1>
        <div className="signUpbox">
          <Username />
          <Password />
          <button onClick={handle_importance} className="glass-button">
            Log in
          </button>
          <div className="NewuserDiv">
            <p className="NewuserText">
              New to GI movies? Signup{" "}
              <Link to="/home" className="NewuserSignupLink">
                {" "}
                Here
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login_page;

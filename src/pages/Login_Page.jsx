import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router";
import "./Login.css";
import Username from "../components/Login and sign up components/Username";
import Password from "../components/Login and sign up components/Password";

function Login_page() {
  const navigae = useNavigate();
  const loc = useLocation();
  const [name, SetName] = useState("");
  const [password, SetPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.classList.add("Signup-bg");

    return () => {
      document.body.classList.remove("Signup-bg");
    };
  }, [loc]);

  const handle_importance = async (event) => {
    event.preventDefault();
    setError(""); // Reset error message
    if (name === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }
    try {
      let response = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: name, password: password }), // Ensure the body matches your backend expectations
      });
      response = await response.json();
      if (response.success) {
        navigae("/home");
      } else {
        setError(response.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="wrapper">
        <h1 className="signtext">GI Movies</h1>
        <form className="signUpbox" onSubmit={handle_importance}>
          {error && <p className="error-message">{error}</p>}
          <Username SetName={SetName} name={name} setError={setError} />
          <Password
            SetPassword={SetPassword}
            pass={password}
            setError={setError}
          />
          <button type="sumbit" className="glass-button">
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
        </form>
      </div>
    </>
  );
}

export default Login_page;

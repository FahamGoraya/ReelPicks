import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router";
import "./Login.css";
import Email from "../components/Login and sign up components/Email";
import Password from "../components/Login and sign up components/Password";

function Login_page() {
  const navigae = useNavigate();
  const loc = useLocation();
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "https://reelpicks-dnc0.onrender.com//api/user/loggedin",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          navigae("/home");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    document.body.classList.add("Signup-bg");

    return () => {
      document.body.classList.remove("Signup-bg");
    };
  }, [loc]);

  const handle_importance = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    if (email === "" || password === "") {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      let response = await fetch(
        "https://reelpicks-dnc0.onrender.com//api/user/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: email, password: password }),
        }
      );
      response = await response.json();
      if (response.success) {
        navigae("/home");
      } else {
        setError(response.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-background-overlay"></div>
        <div className="login-content">
          <div className="logo-section">
            <h1 className="login-title">
              <span className="title-gi">Reel</span>
              <span className="title-movies">Picks</span>
            </h1>
            <p className="login-subtitle">
              Skip the scroll, find your perfect movie
            </p>
          </div>

          <form className="login-form" onSubmit={handle_importance}>
            <div className="form-header">
              <h2 className="form-title">Welcome Back</h2>
              <p className="form-subtitle">
                Sign in to start your movie journey
              </p>
            </div>

            {error && (
              <div className="error-container">
                <div className="error-icon">⚠️</div>
                <p className="error-message">{error}</p>
              </div>
            )}

            <div className="input-container">
              <Email SetEmail={SetEmail} email={email} setError={setError} />
              <Password
                SetPassword={SetPassword}
                pass={password}
                setError={setError}
              />
            </div>

            <button
              type="submit"
              className={`login-button ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <div className="button-arrow">→</div>
                </>
              )}
            </button>

            <div className="form-footer">
              <p className="signup-text">
                New to Next Movie?{" "}
                <Link to="/signup" className="signup-link">
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login_page;

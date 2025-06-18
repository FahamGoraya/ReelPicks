import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router";
import "./Signup.css";
import Username from "../../components/Login and sign up components/Username";
import Password from "../../components/Login and sign up components/Password";

function Signup_page() {
  const navigae = useNavigate();
  const loc = useLocation();
  const [name, SetName] = useState("");
  const [password, SetPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    if (name === "" || password === "") {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      let response = await fetch(
        "https://gimoviesbackend.onrender.com/api/user/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: name, password: password }),
        }
      );
      response = await response.json();
      if (response.success) {
        navigae("/login");
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
            <div className="logo-icon-large">🎬</div>
            <h1 className="login-title">
              <span className="title-gi">Next</span>
              <span className="title-movies">Movie</span>
            </h1>
            <p className="login-subtitle">
              Skip the scroll, find your perfect movie
            </p>
          </div>

          <form className="login-form" onSubmit={handle_importance}>
            <div className="form-header">
              <h2 className="form-title">Welcome Back</h2>
              <p className="form-subtitle">
                Create your account to start your movie journey
              </p>
            </div>

            {error && (
              <div className="error-container">
                <div className="error-icon">⚠️</div>
                <p className="error-message">{error}</p>
              </div>
            )}

            <div className="input-container">
              <Username SetName={SetName} name={name} setError={setError} />
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
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create your account</span>
                  <div className="button-arrow">→</div>
                </>
              )}
            </button>

            <div className="form-footer">
              <p className="signup-text">
                Already have an account?{" "}
                <Link to="/Login" className="signup-link">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup_page;

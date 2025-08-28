import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa"; // import eye icons
import "./Login.css";
import Navbar from "./Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // toggle state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", formData);
    localStorage.setItem("isLoggedIn", true);
    navigate("/");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    localStorage.setItem("isLoggedIn", true);
    navigate("/");
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
    localStorage.setItem("isLoggedIn", true);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="login-with-sidebar">
        <div className="login-container">
          <div className="login-box">
            <h2>Login to TenClothing</h2>
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />

              <label>Password</label>
<div className="password-input-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="••••••••"
    required
  />
  <span
    className="password-toggle"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>


              <p className="forgot-password">
                <a href="/forgot-password">forgot password</a>
              </p>

              <button type="submit">Login</button>
            </form>

            <div className="social-login">
              <p>Or login with</p>
              <button className="google-btn" onClick={handleGoogleLogin}>
                <FcGoogle size={20} style={{ marginRight: "8px" }} />
                Login with Google
              </button>
              <button className="facebook-btn" onClick={handleFacebookLogin}>
                <FaFacebookF size={18} style={{ marginRight: "8px" }} />
                Login with Facebook
              </button>
            </div>

            <p className="signup-text">
              Don’t have an account? <a href="/register">Register here</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

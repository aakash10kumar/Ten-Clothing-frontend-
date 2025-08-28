import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import axios from "axios";
import Navbar from "./Navbar";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );

      if (res.status === 200 || res.status === 201) {
        // ✅ handles both success codes
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", formData.role);
        navigate("/"); // ✅ redirect to homepage
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // Placeholder social logins
  const handleGoogleRegister = () => {
    console.log("Google registration clicked");
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  const handleFacebookRegister = () => {
    console.log("Facebook registration clicked");
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-box">
          <h2>📝 Register for TenClothing</h2>
          <form onSubmit={handleRegister}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="1234567890"
              pattern="[0-9]{10}"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              autoComplete="tel"
            />

            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit">Register</button>
          </form>

          <div className="social-login">
            <p>Or register with</p>
            <button className="google-btn" onClick={handleGoogleRegister}>
              <FcGoogle size={20} style={{ marginRight: "8px" }} />
              Register with Google
            </button>
            <button className="facebook-btn" onClick={handleFacebookRegister}>
              <FaFacebookF size={18} style={{ marginRight: "8px" }} />
              Register with Facebook
            </button>
          </div>

          <p style={{ marginTop: "10px" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#007bff", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;

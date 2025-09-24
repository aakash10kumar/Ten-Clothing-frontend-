import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowForm(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);

        // Pass only the email to onLogin
        const adminEmail = response.data.data.email; 
        onLogin(adminEmail);

        navigate("/admin/dashboard"); // redirect to admin dashboard
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again later.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className={`login-card ${showForm ? "animate-in" : ""}`}>
        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <form className="admin-login-form" onSubmit={handleLogin}>
          <h2>Admin Login</h2>

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />

          <label htmlFor="password">Password:</label>
          <div className="password-toggle-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button type="submit" className="btn-primary">
            Login
          </button>

          <div className="extra-links">
            <button
              type="button"
              className="link-button"
              onClick={() => navigate("/admin/forgotpassword")}
            >
              Forgot Password?
            </button>
          </div>

          <div className="extra-links" style={{ justifyContent: "center" }}>
            <span>Don't have an account?</span>
            <button
              type="button"
              className="link-button"
              onClick={() => navigate("/admin/register")}
            >
              Register here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

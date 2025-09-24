import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css"; // Reusing login styles

function AdminRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "isAdmin",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowForm(true);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/register",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
        }
      );

      if (response.data.success) {
        alert("Registration successful!");
        navigate("/admin"); // Redirect to login
      } else {
        alert("Registration failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className={`login-card ${showForm ? "animate-in" : ""}`}>
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <form className="admin-login-form" onSubmit={handleRegister}>
          <h2>📝 Register for TenClothing</h2>

          <label>Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
          />

          <label>Password</label>
          <div className="password-toggle-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" className="btn-primary">
            Register
          </button>

          <div className="extra-links" style={{ justifyContent: "center" }}>
            <span>Already have an account?</span>
            <button
              type="button"
              className="link-button"
              onClick={() => navigate("/admin")}
            >
              Login here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;

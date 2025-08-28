import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // Reusing login styles

function AdminRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

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

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registered:", formData);
    alert("Registered successfully (stub)!");
    navigate("/admin");
  };

  return (
    <div className="admin-login-container">
      <div className={`login-card ${showForm ? "animate-in" : ""}`}>
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
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
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="number"
            required
            value={formData.number}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="btn-primary">Register</button>

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

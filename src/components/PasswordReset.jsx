import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PasswordReset.css";

const PasswordReset = () => {
  const { token } = useParams(); // get reset token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    try {
      // Call backend API to reset password
      // Example: POST /api/reset-password
      const res = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Password successfully reset!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage("❌ Something went wrong. Try again.");
    }
  };

  return (
    <div className="password-reset-container">
      <div className="password-reset-box">
        <h2>🔐 Create New Password</h2>
        <p>Enter a strong new password for your account.</p>

        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Reset Password</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default PasswordReset;

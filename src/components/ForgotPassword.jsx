import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would call your backend API to send reset email
    alert(`A password reset link has been sent to ${email}`);
    navigate("/"); // Go back to home or login after sending
  };

  return (
    <div className="forgot-password-container">
      <button className="back-button" onClick={() => navigate("/login")}>
        ⬅ Back to Login
      </button>

      <div className="forgot-password-box">
        <h2>🔑 Reset Your Password</h2>
        <p>Enter your registered email address. We'll send you a password reset link.</p>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

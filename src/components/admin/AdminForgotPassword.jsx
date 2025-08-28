import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminForgotPassword.css';

function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowForm(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email} (stub).`);
    navigate('/admin');
  };

  return (
    <div className="admin-login-container">
      <div className={`login-card ${showForm ? 'animate-in' : ''}`}>
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <h2>🔐 Forgot Password</h2>

          <label>Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />

          <button type="submit" className="btn-primary">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
}

export default AdminForgotPassword;

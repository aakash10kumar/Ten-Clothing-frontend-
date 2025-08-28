import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('admin@clothing.com');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animation after component mounts
    setShowForm(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@clothing.com' && password === 'admin123') {
      onLogin();
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="admin-login-container">
      <div className={`login-card ${showForm ? 'animate-in' : ''}`}>
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <form className="admin-login-form" onSubmit={handleLogin}>
          <h2>Admin Login</h2>

          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />

          <label>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button type="submit" className="btn-primary">Login</button>

          <div className="extra-links">
            <button
              type="button"
              className="link-button"
              onClick={() => navigate('/admin/forgotpassword')}
            >
              Forgot Password?
            </button>
          </div>

          <div className="extra-links" style={{ justifyContent: 'center' }}>
            <span>Don't have an account?</span>
            <button
              type="button"
              className="link-button"
              onClick={() => navigate('/admin/register')}
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

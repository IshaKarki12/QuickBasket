import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded admin credentials
  const adminCredentials = {
    email: "isha123@gmail.com",
    password: "isha123"
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === adminCredentials.email && password === adminCredentials.password) {
      setError("");
      // Redirect to dashboard
      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="admin-login-page">
      <h2 className="section-title">Admin Login</h2>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter admin email" 
          required 
        />

        <label>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter password" 
          required 
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="checkout-btn">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;

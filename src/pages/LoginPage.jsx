import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded credentials
  const adminCredentials = { email: "isha123@gmail.com", password: "isha123" };
  const customerCredentials = { email: "customer@gmail.com", password: "customer123" };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === adminCredentials.email && password === adminCredentials.password) {
      setError("");
      navigate("/admin/dashboard");
    } else if (email === customerCredentials.email && password === customerCredentials.password) {
      setError("");
      navigate("/checkout"); // or /profile
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <h2 className="section-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your email" 
          required 
        />

        <label>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter your password" 
          required 
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="checkout-btn">Login</button>
      </form>

      {/* Register link for customers */}
      <div className="login-footer">
        <p>
          Don't have an account?{" "}
          <span className="register-link" onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

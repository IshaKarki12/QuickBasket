import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      const user = response.data.user;
      alert(response.data.message);

      // Redirect based on user email (we will use roles later)
      if (user.email === "isha123@gmail.com") {
        navigate("/admin/dashboard");
      } else {
        navigate("/cart"); // customer goes to cart page
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
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

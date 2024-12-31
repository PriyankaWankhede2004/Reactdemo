import React, { useState } from "react";
import "./Login.css";  

const Login = ({ onLogin }) => {
  const [id, setId] = useState("admin");
  const [password, setPassword] = useState("12345");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (id === "admin" && password === "12345") {
      onLogin();
    } else {
      alert("Invalid Id and Password");
    }
  };

  return (
    <div className="login-container">
      {/* Welcome Text */}
      <div className="welcome-text">
        Welcome to Login
      </div>

      <div className="form-container">
        <h3>Login</h3>
        <form>
          {/* ID Input */}
          <div className="input-field">
            <label className="label">
              ID:
            </label>
            <input
              type="text"
              className="input"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter your ID"
            />
          </div>

          {/* Password Input */}
          <div className="input-field password-field">
            <label className="label">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {/* Show/Hide Password */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="eye-icon"
            >
              {showPassword ? (
                <i className="fas fa-eye"></i>
              ) : (
                <i className="fas fa-eye-slash"></i>
              )}
            </span>
          </div>

          {/* Click to login */}
          <div className="click-to-login">
            Click to login
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={handleLogin}
            className="login-button"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
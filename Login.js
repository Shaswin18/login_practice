import React, { useState } from "react";
import './Login.css'; // Import your CSS file for styles

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Welcome</h2>
        <p>Please enter your details.</p>
        <form>
          <input type="email" placeholder="Enter your email" required />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="login-right">
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Login;
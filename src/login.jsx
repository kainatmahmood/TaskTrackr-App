import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Show error if user was redirected here due to unauthorized access
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorParam = params.get("error");

    if (errorParam === "unauthorized") {
      setError("You must log in first.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [location.search]);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("user", JSON.stringify(foundUser));
       console.log("Login successful:", foundUser);
      navigate("/dashboard");
    } else {
      setError("Invalid Credentials.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="login-container">
      <h2>TaskTrackr</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

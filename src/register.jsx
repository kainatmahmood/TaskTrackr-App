import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // check if username already exists
    const exists = users.find((user) => user.username === username);
    if (exists) {
      setError("Username already exists.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const newUser = { username, password, role: "user" }; // default role: user
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    navigate("/"); // go to login
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form className="login-form" onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

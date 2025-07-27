import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages

  const handleSave = () => {
  const updatedUser = { ...user, username, email };
  if (password) updatedUser.password = password;

  //  Load users array only once
  const allUsers = JSON.parse(localStorage.getItem("users")) || [];

  //  Check for duplicate usernames
  const usernameExists = allUsers.some(
    (u) => u.username === username && u.username !== user.username
  );

  if (usernameExists) {
    setError("This username is already taken.");
    return;
  }

  //  Update users array
  const updatedUsers = allUsers.map((u) =>
    u.username === user.username && u.password === user.password
      ? updatedUser
      : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  //  Update logged-in user object
  localStorage.setItem("user", JSON.stringify(updatedUser));
  setUser(updatedUser);

  //  Update boards (if username changed)
  if (username !== user.username) {
    const boards = JSON.parse(localStorage.getItem("boards")) || [];
    const updatedBoards = boards.map((board) =>
      board.owner === user.username ? { ...board, owner: username } : board
    );
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  }

  setError(""); // Clear error
  alert("Settings updated successfully");
  navigate("/dashboard");
};


  return (
    <div className="settings-container">
  <h2>Settings</h2>

  <label>Username</label>
  <input
    type="text"
    value={username}
    placeholder="Enter new username." 
    onChange={(e) => setUsername(e.target.value)}
  />

  <label>Email</label>
  <input
    value={email}
    placeholder="Enter email if you want to add"
    onChange={(e) => setEmail(e.target.value)}
  />

  <label>New Password</label>
  <input
    type="password"
    value={password}
    placeholder="Set new password"
    onChange={(e) => setPassword(e.target.value)}
  />

  {error && <p className="error-message">{error}</p>}

  <button onClick={handleSave}>Save Changes</button>
</div>

  );
}

export default Settings;

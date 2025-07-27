import React from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/");
    return null;
  }
 
  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-card">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email || "Not provided"}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>
    </div>
  );
}

export default Profile;

import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li><Link to="/dashboard"> Dashboard</Link></li>
        <li><Link to="/dashboard"> My Boards</Link></li>
        
        {user?.role === "admin" && (
          <li><Link to="/adminpanel"> Admin Panel</Link></li>
        )}

        <li><Link to="/settings"> Settings</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;

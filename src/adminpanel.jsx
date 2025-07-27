import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedBoards = JSON.parse(localStorage.getItem("boards")) || [];

    setUsers(storedUsers);
    setBoards(storedBoards);
  }, []);

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Also remove their boards
    const updatedBoards = boards.filter((board) => board.ownerId !== id);
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  const handleDeleteBoard = (id) => {
    const updatedBoards = boards.filter((board) => board.id !== id);
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  const countBoardsForUser = (username) => {
    return boards.filter((board) => board.owner === username).length;
  };

  const getUsernameById = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.username : "Unknown";
  };

  return (
    <div className="admin-dashboard">
      {/* Summary Cards */}
      <div className="admin-stats">
        <div className="admin-card">
          <h3>Total Users</h3>
          <p>{users.filter((user) => user.role !== "admin").length}</p>
        </div>
        <div className="admin-card">
          <h3>Total Boards</h3>
          <p>{boards.length}</p>
        </div>
      </div>

      {/* User Management Table */}
      <div className="admin-table-section">
        <h3 className="admin-table-title">User Management</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th># Boards</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.role !== "admin")
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{countBoardsForUser(user.username)}</td>
                  <td className="admin-table-actions">
                    <button
                      className="btn-admin btn-delete"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Board Management Table */}
      <div className="admin-table-section">
        <h3 className="admin-table-title">Board Management</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((board) => (
              <tr key={board.id}>
                <td>{board.title}</td>
                <td>{board.owner}</td>
                <td className="admin-table-actions">
                  {/* View button */}
                  <button
                    className="btn-admin btn-view"
                    onClick={() => navigate(`/board/${board.id}`)}
                  >
                    View
                  </button>

                  {/* Delete button */}
                  <button
                    className="btn-admin btn-delete"
                    onClick={() => handleDeleteBoard(board.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;

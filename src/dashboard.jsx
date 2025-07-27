import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function Dashboard() {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const [boards, setBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingBoardId, setDeletingBoardId] = useState(null);

  useEffect(() => {
    if (!loggedUser) {
      navigate("/");
      return;
    }

    const allBoards = JSON.parse(localStorage.getItem("boards")) || [];
    const filteredBoards =
      loggedUser.role === "admin"
        ? allBoards
        : allBoards.filter((board) => board.owner === loggedUser.username);

    setBoards(filteredBoards);
  }, []);

  const handleCreateBoard = () => {
    setShowModal(true);
  };

  const handleModalCreate = () => {
    if (!newTitle.trim()) return;

    const allBoards = JSON.parse(localStorage.getItem("boards")) || [];

    const newBoard = {
      id: Date.now(),
      title: newTitle,
      owner: loggedUser.username,
      ownerId: loggedUser.id,
      lists: [
        { id: "initial", title: "Initial", tasks: [] },
        { id: "high", title: "High Priority", tasks: [] },
        { id: "low", title: "Low Priority", tasks: [] },
      ],
    };

    const updatedBoards = [...allBoards, newBoard];
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
    setBoards(
      loggedUser.role === "admin"
        ? updatedBoards
        : updatedBoards.filter((b) => b.owner === loggedUser.username)
    );
    setNewTitle("");
    setShowModal(false);

    setTimeout(() => {
      navigate(`/board/${newBoard.id}`);
    }, 0);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setNewTitle("");
  };

  const handleEditBoard = (id) => {
    const boardToEdit = boards.find((b) => b.id === id);
    if (!boardToEdit) return;

    setEditingBoardId(id);
    setEditTitle(boardToEdit.title);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;

    const allBoards = JSON.parse(localStorage.getItem("boards")) || [];
    const updatedBoards = allBoards.map((board) =>
      board.id === editingBoardId ? { ...board, title: editTitle } : board
    );

    localStorage.setItem("boards", JSON.stringify(updatedBoards));
    setBoards(
      loggedUser.role === "admin"
        ? updatedBoards
        : updatedBoards.filter((b) => b.owner === loggedUser.username)
    );

    setShowEditModal(false);
    setEditTitle("");
    setEditingBoardId(null);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditTitle("");
    setEditingBoardId(null);
  };

  const handleDeleteClick = (id) => {
    setDeletingBoardId(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteBoard = () => {
    const allBoards = JSON.parse(localStorage.getItem("boards")) || [];
    const updatedBoards = allBoards.filter(
      (board) => board.id !== deletingBoardId
    );

    localStorage.setItem("boards", JSON.stringify(updatedBoards));
    setBoards(
      loggedUser.role === "admin"
        ? updatedBoards
        : updatedBoards.filter((b) => b.owner === loggedUser.username)
    );

    setShowDeleteModal(false);
    setDeletingBoardId(null);
  };

  const cancelDeleteBoard = () => {
    setShowDeleteModal(false);
    setDeletingBoardId(null);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-welcome">
        Welcome, {loggedUser?.username}
        {loggedUser?.role === "admin" ? " (Admin)" : ""}
      </h2>

      <button className="btn-create-board" onClick={handleCreateBoard}>
        + Create New Board
      </button>

      {/* Create Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Create New Board</h3>
            <input
              type="text"
              placeholder="Enter board title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleModalCreate}>Create</button>
              <button onClick={handleModalCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Board Title</h3>
            <input
              type="text"
              placeholder="Enter new title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleSaveEdit}>Update</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this board?</p>
            <div className="modal-buttons">
              <button onClick={confirmDeleteBoard} className="btn-delete">
                Delete
              </button>
              <button onClick={cancelDeleteBoard} className="btn-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show Boards */}
      {boards.length === 0 ? (
        <p className="no-boards">No boards found. Create one!</p>
      ) : (
        <div className="boards-grid">
          {boards.map((board) => (
            <div key={board.id} className="board-card">
              <h3 className="board-title">{board.title}</h3>
              {loggedUser.role === "admin" && (
                <p className="board-owner">Owner: {board.owner}</p>
              )}

              <div className="board-actions">
                <button
                  className="btn-open-board"
                  onClick={() => navigate(`/board/${board.id}`)}
                >
                  Open
                </button>

                {loggedUser.username === board.owner && (
                  <button
                    className="btn-edit"
                    onClick={() => handleEditBoard(board.id)}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="btn-delete"
                  onClick={() => handleDeleteClick(board.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;

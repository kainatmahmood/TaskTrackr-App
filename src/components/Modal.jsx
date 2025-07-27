import React, { useState, useEffect } from "react";
import "../App.css";

function Modal({ task, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [status, setStatus] = useState(task?.status || "to do");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...task, title, description, dueDate, status });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description:</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="to do">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn-delete-task"
              onClick={() => onDelete(task.id)}
            >
              Delete Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;

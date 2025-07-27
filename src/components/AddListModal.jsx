
import React, { useState } from "react";

function AddListModal({ isOpen, onClose, onAddList }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddList(title.trim());
      setTitle("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New List</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="List Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default AddListModal;

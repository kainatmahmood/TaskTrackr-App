import React from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal confirm-modal">
        <h2>Confirm</h2>
        <p>{message || "Are you sure?"}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="btn-confirm">
            Yes
          </button>
          <button onClick={onClose} className="btn-cancel">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
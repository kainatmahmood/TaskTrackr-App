
import React from "react";

function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div className="task-card">
      <h4 className="task-title">{task.title}</h4>
      <p className="task-desc">{task.desc}</p>
      {task.due && (
        <p className="task-due">
          <strong>Due:</strong> {task.due}
        </p>
      )}
      <div className="task-actions">
        <button className="task-btn delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
        <button className="task-btn edit-btn" onClick={() => onEdit(task)}>Edit</button>
      </div>
    </div>
  );
}

export default TaskCard;

# TaskTrackr App
# 📝 TaskTrackr App

**TaskTrackr** is a user-friendly Kanban-style task management app built with **React**. It supports multiple users with login/register functionality, admin control, draggable tasks, due date reminders, and a customizable board layout.

## 🚀 Features

 **Authentication** – Login & Register with role-based access (Admin/User)
 **Boards** – Create and manage multiple boards
**Kanban Layout** – Drag-and-drop tasks between columns (To Do, In Progress, Completed)
**Due Dates** – Tasks have deadlines
**Task Status Tags** – Visual tags for task states
**Custom Lists** – Add your own columns/lists dynamically
   **Role-based Views**:
  - Admin: Can view & delete all boards
  - User: Can view & manage their own boards only
**Settings Page** – Change username, email, and password


##  Tech Stack

- **Frontend:** React, React Router, Vite
- **State Management:** useState, useEffect, localStorage
- **Drag & Drop:** react-beautiful-dnd
- **Styling:** Custom CSS / Tailwind (if used)
- **Routing:** React Router DOM

##  Folder Structure

tasktrackr-app/
├── public/
├── src/
│ ├── components/
│ │ ├── Modal.jsx
│ │ ├── AddListModal.jsx
│ │ └── ConfirmModal.jsx
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── Board.jsx
│ │ ├── Settings.jsx
│ │ └── Profile.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── App.css
├── .gitignore
├── package.json
└── README.md


## 🔧 Getting Started

To run the app locally:

# 1. Clone the repo
git clone https://github.com/kainatmahmood/TaskTrackr-App.git

# 2. Navigate into the folder
cd TaskTrackr-App

# 3. Install dependencies
npm install

# 4. Run the app
npm run dev

## Author
@kainatmahmood

 ## License
This project is open source and free to use.

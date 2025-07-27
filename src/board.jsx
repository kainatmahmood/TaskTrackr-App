import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "./components/Modal"; // Task edit modal
import AddListModal from "./components/AddListModal"; // New list modal
import "./App.css";

function Board() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [addListModalOpen, setAddListModalOpen] = useState(false);

  // Load board and tasks on mount or id change
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("boards")) || [];
    const found = data.find((b) => b.id == id);
    if (found) {
      setBoard(found);
      // FIX: Use list.id as priority instead of list.title
      const allTasks = found.lists.flatMap((list) =>
        list.tasks.map((t) => ({ ...t, listId: list.id, priority: list.id }))
      );
      setTasks(allTasks);
    }
  }, [id]);

  // Save updated board lists and tasks back to localStorage
  const updateBoardInStorage = (updatedTasks, updatedLists = null) => {
    let lists;

    if (updatedLists) {
      lists = updatedLists;
    } else if (board && board.lists) {
      lists = board.lists.map((list) => ({
        ...list,
        tasks: updatedTasks.filter((t) => t.priority === list.id),
      }));
    } else {
      lists = [];
    }

    const allBoards = JSON.parse(localStorage.getItem("boards")) || [];
    const newBoards = allBoards.map((b) => (b.id == id ? { ...b, lists } : b));

    localStorage.setItem("boards", JSON.stringify(newBoards));
    setBoard((prev) => ({ ...prev, lists }));
  };

  // Handle task drag and drop
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const movedTask = tasks.find((t) => t.id.toString() === draggableId);
    if (movedTask) {
      const updatedTasks = tasks.map((t) =>
        t.id.toString() === draggableId
          ? { ...t, priority: destination.droppableId }
          : t
      );

      // Build updated lists with new tasks arrays
      const updatedLists = board.lists.map((list) => ({
        ...list,
        tasks: updatedTasks.filter((task) => task.priority === list.id),
      }));

      setTasks(updatedTasks);
      setBoard((prev) => ({ ...prev, lists: updatedLists }));

      setSelectedTask({ ...movedTask, priority: destination.droppableId });
      setModalOpen(true);

      updateBoardInStorage(updatedTasks, updatedLists);
    }
  };

  // Save edited task from modal
  const handleSave = (updatedTask) => {
    const updated = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(updated);
    updateBoardInStorage(updated);
    setModalOpen(false);
  };

  // Add new task to "initial" priority by default
  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      description: "",
      dueDate: "",
      status: "to do",
      priority: "initial",
    };

    // Add new task to tasks state
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);

    // Update lists: add new task to the 'initial' list's tasks array
    const updatedLists = board.lists.map((list) => {
      if (list.id === "initial") {
        return {
          ...list,
          tasks: [...list.tasks, newTask],
        };
      }
      return list;
    });

    // Update board state with new lists
    setBoard((prev) => ({ ...prev, lists: updatedLists }));

    // Update localStorage with both updatedTasks and updatedLists
    updateBoardInStorage(newTasks, updatedLists);
  };

  // Add new list to board
  const addNewList = (title) => {
    if (!title) return;
    const newList = {
      id: Date.now(),
      title,
      tasks: [],
    };
    const updatedLists = board.lists ? [...board.lists, newList] : [newList];
    setBoard((prev) => ({ ...prev, lists: updatedLists }));
    setAddListModalOpen(false);

    const allBoards = JSON.parse(localStorage.getItem("boards")) || [];
    const newBoards = allBoards.map((b) =>
      b.id == id ? { ...b, lists: updatedLists } : b
    );
    localStorage.setItem("boards", JSON.stringify(newBoards));
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);

    const updatedLists = board.lists.map((list) => ({
      ...list,
      tasks: list.tasks.filter((task) => task.id !== taskId),
    }));

    setTasks(updatedTasks);
    setBoard((prev) => ({ ...prev, lists: updatedLists }));

    updateBoardInStorage(updatedTasks, updatedLists);
    setModalOpen(false);
  };

  const handleDeleteList = (listId) => {
    const updatedLists = board.lists.filter((list) => list.id !== listId);

    const remainingTasks = tasks.filter((task) => task.priority !== listId);

    setTasks(remainingTasks);
    setBoard((prev) => ({ ...prev, lists: updatedLists }));
    updateBoardInStorage(remainingTasks, updatedLists);
  };

  return (
    <div className="board-page">
      <div className="board-header">
        <h2>{board?.title}</h2>
        <button
          className="btn add-list"
          onClick={() => setAddListModalOpen(true)}
        >
          + Add List
        </button>
      </div>

      <div className="add-task-bar">
        <input
          type="text"
          placeholder="Enter task title"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
              addTask(e.target.value.trim());
              e.target.value = "";
            }
          }}
        />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          {board?.lists?.map((list) => (
            <Droppable droppableId={list.id} key={list.id}>
              {(provided) => (
                <div
                  className={`column ${list.title}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="list-header">
                    <h3>
                      {list.id === "initial"
                        ? "Initial Tasks"
                        : list.id === "high"
                        ? "High Priority"
                        : list.id === "low"
                        ? "Low Priority"
                        : list.title}
                    </h3>

                    {!["initial", "high", "low"].includes(list.id) && (
                      <button
                        className="btn-delete-list"
                        onClick={() => handleDeleteList(list.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  {tasks
                    .filter((task) => task.priority === list.id)
                    .map((task, index) => (
                      <Draggable
                        draggableId={task.id.toString()}
                        index={index}
                        key={task.id}
                      >
                        {(provided) => (
                          <div className="task-wrapper">
                            <div
                              className="task-card"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => {
                                setSelectedTask(task);
                                setModalOpen(true);
                              }}
                            >
                              <div className="task-content">
                                <div className="task-title-status">
                                  <div className="task-title">{task.title}</div>
                                  <span
                                    className={`task-status status-${task.status
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()}`}
                                  >
                                    {task.status}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/*  Show drag hint only for 'initial' list */}
                            {task.priority === "initial" && (
                              <div className="drag-hint">
                                🛈 Drag to High or Low Priority
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {modalOpen && (
        <Modal
          task={selectedTask}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          onDelete={handleDeleteTask}
        />
      )}

      {addListModalOpen && (
        <AddListModal
          isOpen={addListModalOpen}
          onClose={() => setAddListModalOpen(false)}
          onAddList={addNewList}
        />
      )}
    </div>
  );
}

export default Board;

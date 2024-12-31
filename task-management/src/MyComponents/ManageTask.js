import React, { useState, useEffect } from "react";

const ManageTasks = ({ tasks, setTasks, setTrashTasks }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, [setTasks]);

  // Save tasks to localStorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (taskName && taskDetails && dueDate && expiryDate) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        details: taskDetails,
        dueDate,
        expiryDate,
        createdDate: new Date().toLocaleDateString(),
        status: "Pending",
      };
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update localStorage
        return updatedTasks;
      });
      resetForm();
    } else {
      alert("Please fill in all the fields.");
    }
  };

  // Update an existing task
  const updateTask = () => {
    if (taskName && taskDetails && dueDate && expiryDate) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTaskId
            ? { ...task, name: taskName, details: taskDetails, dueDate, expiryDate }
            : task
        )
      );
      localStorage.setItem("tasks", JSON.stringify(tasks)); 
      resetForm();
    } else {
      alert("Please fill in all the fields.");
    }
  };

  // Move task to trash 
  const deleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);

    // Remove task from the main task list
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 
      return updatedTasks;
    });

    // Save to trashTasks in state and localStorage
    setTrashTasks((prevTrashTasks) => {
      const updatedTrashTasks = [...prevTrashTasks, taskToDelete];
      localStorage.setItem("trashTasks", JSON.stringify(updatedTrashTasks)); 
      return updatedTrashTasks;
    });
  };

  // Mark task as complete
  const markAsComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task
      )
    );
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
  };

  // Check if task is expired
  const isTaskExpired = (expiryDate) => {
    const today = new Date();
    const taskExpiry = new Date(expiryDate);
    return taskExpiry < today;
  };

  // Reset form for adding/updating tasks
  const resetForm = () => {
    setTaskName("");
    setTaskDetails("");
    setDueDate("");
    setExpiryDate("");
    setShowForm(false);
    setEditingTaskId(null);
  };

  return (
    <div className="container mt-5">
      <h2>Manage Tasks</h2>
      {!editingTaskId && (
        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add Task"}
        </button>
      )}
      {showForm && (
        <div>
          <div className="mb-3">
            <label>Task Name</label>
            <input
              type="text"
              className="form-control"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Task Details</label>
            <textarea
              className="form-control"
              value={taskDetails}
              onChange={(e) => setTaskDetails(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label>Task Creation Date:</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Due Date:</label>
            <input
              type="date"
              className="form-control"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <button
            className="btn btn-success mb-3"
            onClick={editingTaskId ? updateTask : addTask}
          >
            {editingTaskId ? "Update Task" : "Add Task"}
          </button>
        </div>
      )}
      <h4>Task List</h4>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`list-group-item d-flex justify-content-between align-items-center mb-3 border rounded ${
              task.status === "Completed"
                ? "bg-success text-white"
                : isTaskExpired(task.expiryDate)
                ? "bg-danger text-white"
                : ""
            }`}
            style={{
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <div>
              <strong>{task.name}</strong>
              <p>{task.details}</p>
              <small>
                Created Date: {task.createdDate} | Expiry Date:{" "}
                {task.expiryDate}
              </small>
              <p>Status: {task.status === "Pending" ? "Pending" : task.status === "Completed" ? "Completed" : "Expired"}</p>
            </div>
            <div>
              {task.status === "Pending" && !isTaskExpired(task.expiryDate) && (
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => markAsComplete(task.id)}
                >
                  Mark as Completed
                </button>
              )}
              {task.status === "Pending" && !isTaskExpired(task.expiryDate) && (
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setTaskName(task.name);
                    setTaskDetails(task.details);
                    setDueDate(task.dueDate);
                    setExpiryDate(task.expiryDate);
                    setEditingTaskId(task.id);
                    setShowForm(true);
                  }}
                >
                  Edit Task
                </button>
              )}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTask(task.id)}
              >
                Delete Task
              </button>
              {/* If the task is completed, show 'Completed' */}
              {task.status === "Completed" && (
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "white",
                    backgroundColor: "green",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    textTransform: "uppercase",
                    marginLeft: "10px",
                  }}
                >
                  Completed
                </span>
              )}
              {/* If the task is expired, show 'Expired' */}
              {isTaskExpired(task.expiryDate) && (
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "white",
                    backgroundColor: "red",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    textTransform: "uppercase",
                    marginLeft: "10px",
                  }}
                >
                  Expired
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageTasks;
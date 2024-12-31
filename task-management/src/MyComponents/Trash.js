import React, { useEffect } from "react";

const Trash = ({ trashTasks, setTrashTasks, setTasks }) => {
  // Load trash tasks from localStorage 
  useEffect(() => {
    const savedTrashTasks = JSON.parse(localStorage.getItem("trashTasks"));
    if (savedTrashTasks) {
      setTrashTasks(savedTrashTasks); 
    } else {
      // If no trash tasks in localStorage, initialize with empty array
      setTrashTasks([]);
    }
  }, [setTrashTasks]);

  // Save trash tasks to localStorage 
  useEffect(() => {
    if (trashTasks.length > 0) {
      localStorage.setItem("trashTasks", JSON.stringify(trashTasks));
    }
  }, [trashTasks]);

  // Restore task from trash
  const restoreTask = (id) => {
    const taskToRestore = trashTasks.find((task) => task.id === id);

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, taskToRestore];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 
      return updatedTasks;
    });

    // Remove the task from trash
    const updatedTrashTasks = trashTasks.filter((task) => task.id !== id);
    setTrashTasks(updatedTrashTasks); 
    localStorage.setItem("trashTasks", JSON.stringify(updatedTrashTasks)); 
  };

  // Permanently delete task from trash
  const permanentlyDeleteTask = (id) => {
    const updatedTrashTasks = trashTasks.filter((task) => task.id !== id);
    setTrashTasks(updatedTrashTasks); 
    localStorage.setItem("trashTasks", JSON.stringify(updatedTrashTasks));
  };

  // Delete all tasks from trash
  const deleteAllTasks = () => {
    setTrashTasks([]); 
    localStorage.setItem("trashTasks", JSON.stringify([])); 
  };

  return (
    <div className="container mt-5">
      <h2>Trash</h2>
      <button className="btn btn-danger mb-3" onClick={deleteAllTasks}>
        Delete All Tasks in Trash
      </button>
      {trashTasks.length === 0 ? (
        <p>No tasks in trash.</p>
      ) : (
        <ul className="list-group">
          {trashTasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{task.name}</strong>
                <p>{task.details}</p>
                <small>Created: {task.createdDate} | Due: {task.dueDate}</small>
              </div>
              <div>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => restoreTask(task.id)}
                >
                  Restore
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => permanentlyDeleteTask(task.id)}
                >
                  Delete Permanently
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Trash;
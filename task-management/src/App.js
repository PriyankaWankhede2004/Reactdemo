import React, { useState, useEffect } from "react";
import Login from "./MyComponents/Login";
import Navbar from "./MyComponents/Navbar";
import Dashboard from "./MyComponents/Dashboard";
import Profile from "./MyComponents/Profile";
import ManageTasks from "./MyComponents/ManageTask";
import Trash from "./MyComponents/Trash";
import Settings from "./MyComponents/Settings";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentSection, setCurrentSection] = useState("dashboard");

  const [tasks, setTasks] = useState([]);
  const [trashTasks, setTrashTasks] = useState([]);

  // Load tasks and trashTasks from localStorage when the app loads
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedTrashTasks = JSON.parse(localStorage.getItem("trashTasks")) || [];
    
    setTasks(savedTasks);
    setTrashTasks(savedTrashTasks);
  }, []); 

  // Save tasks and trashTasks to localStorage 
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    if (trashTasks.length > 0) {
      localStorage.setItem("trashTasks", JSON.stringify(trashTasks));
    }
  }, [trashTasks]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentSection("dashboard");
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Navbar onSectionChange={setCurrentSection} onLogout={handleLogout} />
          {currentSection === "dashboard" && (
            <Dashboard tasks={tasks} />
          )}
          {currentSection === "profile" && <Profile />}
          {currentSection === "manage-tasks" && (
            <ManageTasks tasks={tasks} setTasks={setTasks} setTrashTasks={setTrashTasks} />
          )}
          {currentSection === "trash" && (
            <Trash
              trashTasks={trashTasks}
              setTrashTasks={setTrashTasks}
              setTasks={setTasks}
            />
          )}
          {currentSection === "settings" && <Settings />}
        </>
      )}
    </div>
  );
};

export default App;
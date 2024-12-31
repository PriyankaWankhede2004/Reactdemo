import React, { useState } from "react";

const Navbar = ({ onSectionChange, onLogout, profileImage }) => {
  const [currentSection, setCurrentSection] = useState("dashboard");

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    onSectionChange(section);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        backgroundColor: "#000000",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
        color: "white",
      }}
    >
      <div className="container-fluid">
        <span
          className="navbar-brand"
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Task Management
        </span>

        {/* Hamburger Icon */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links (Collapse on Mobile) */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul
            className="navbar-nav me-auto"
            style={{
              flexDirection: "row", 
              justifyContent: "center", 
            }}
          >
            {/* Dashboard Button */}
            <li className="nav-item">
              <button
                className={`btn ${
                  currentSection === "dashboard" ? "btn-light" : "btn-outline-light"
                }`}
                onClick={() => handleSectionChange("dashboard")}
                style={{
                  fontWeight: "bold",
                  borderRadius: "0",
                  margin: "0 5px",
                }}
              >
                Dashboard
              </button>
            </li>

            {/* Manage Tasks Button */}
            <li className="nav-item">
              <button
                className={`btn ${
                  currentSection === "manage-tasks" ? "btn-light" : "btn-outline-light"
                }`}
                onClick={() => handleSectionChange("manage-tasks")}
                style={{
                  fontWeight: "bold",
                  borderRadius: "0",
                  margin: "0 5px",
                }}
              >
                Manage Tasks
              </button>
            </li>

            {/* Trash Button */}
            <li className="nav-item">
              <button
                className={`btn ${
                  currentSection === "trash" ? "btn-light" : "btn-outline-light"
                }`}
                onClick={() => handleSectionChange("trash")}
                style={{
                  fontWeight: "bold",
                  borderRadius: "0",
                  margin: "0 5px",
                }}
              >
                Trash
              </button>
            </li>

            {/* Settings Button */}
            <li className="nav-item">
              <button
                className={`btn ${
                  currentSection === "settings" ? "btn-light" : "btn-outline-light"
                }`}
                onClick={() => handleSectionChange("settings")}
                style={{
                  fontWeight: "bold",
                  borderRadius: "0",
                  margin: "0 5px",
                }}
              >
                Settings
              </button>
            </li>
          </ul>

          {/* Profile and Logout Section */}
          <ul
            className="navbar-nav ms-auto"
            style={{
              display: "flex", 
              flexDirection: "row", 
              alignItems: "center", 
            }}
          >
            <li className="nav-item d-flex align-items-center">
              {/* Profile Image */}
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginRight: "8px",
                  backgroundColor: "#ccc",
                }}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      lineHeight: "30px",
                      textAlign: "center",
                      display: "block",
                      color: "#fff",
                    }}
                  >
                    P
                  </span>
                )}
              </div>

              {/* Profile Button */}
              <button
                className={`btn ${
                  currentSection === "profile" ? "btn-light" : "btn-outline-light"
                }`}
                onClick={() => handleSectionChange("profile")}
                style={{
                  fontWeight: "bold",
                  borderRadius: "0",
                  margin: "0 5px",
                }}
              >
                Profile
              </button>
            </li>

            {/* Logout Button */}
            <li className="nav-item" style={{ marginTop: "5px" }}>
              <button
                className="btn btn-danger"
                onClick={onLogout}
                style={{
                  marginLeft: "10px",
                  borderRadius: "5px",
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
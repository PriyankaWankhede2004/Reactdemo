import React, { useState } from "react";

const Dashboard = ({ tasks }) => {
  // hover effect
  const [hoveredCard, setHoveredCard] = useState(null);

  // Calculating counts for Total, Pending, Completed, and Expired Tasks
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.status === "Pending").length;
  const completedTasks = tasks.filter(task => task.status === "Completed").length;
  const expiredTasks = tasks.filter(task => {
    const today = new Date();
    return new Date(task.expiryDate) < today;
  }).length;

  const cardStyle = {
    transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
    cursor: "pointer",
    borderRadius: "10px", // Rounded corners
  };

  const cardHoverStyle = {
    transform: "translateY(-10px)",
    boxShadow: "px 4px 20px rgba(7, 7, 7, 0.4), -4px -4px 20px rgba(89, 85, 85, 0.5)",
    backgroundColor: "#f0f0f0", 
  };

  const cardTextStyle = {
    fontSize: "2rem", 
    fontWeight: "bold",
    marginTop: "1rem",
    textAlign: "center",
    padding: "10px",
    borderRadius: "8px",
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center" style={{ color: "#333", fontSize: "2.5rem", fontWeight: "700" }}>Dashboard</h2>
      <div className="row">
        {/* Top row with Total Tasks and Pending Tasks */}
        <div className="col-md-6 mb-4">
          <div
            className="card text-white bg-primary shadow-lg"
            style={hoveredCard === "total" ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
            onMouseEnter={() => setHoveredCard("total")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: "1.5rem", fontWeight: "600" }}>Total Tasks</h5>
              <div className="border rounded-2" style={cardTextStyle}>{totalTasks}</div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div
            className="card text-white bg-warning shadow-lg"
            style={hoveredCard === "pending" ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
            onMouseEnter={() => setHoveredCard("pending")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: "1.5rem", fontWeight: "600" }}>Pending Tasks</h5>
              <div className="border rounded-2" style={cardTextStyle}>{pendingTasks}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Bottom row with Completed Tasks and Expired Tasks */}
        <div className="col-md-6 mb-4">
          <div
            className="card text-white bg-success shadow-lg"
            style={hoveredCard === "completed" ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
            onMouseEnter={() => setHoveredCard("completed")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: "1.5rem", fontWeight: "600" }}>Completed Tasks</h5>
              <div className="border rounded-2" style={cardTextStyle}>{completedTasks}</div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div
            className="card text-white bg-danger shadow-lg"
            style={hoveredCard === "expired" ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
            onMouseEnter={() => setHoveredCard("expired")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: "1.5rem", fontWeight: "600" }}>Expired Tasks</h5>
              <div className="border rounded-2" style={cardTextStyle}>{expiredTasks}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
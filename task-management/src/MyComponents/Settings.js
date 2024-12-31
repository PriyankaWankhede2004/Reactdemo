import React, { useState, useEffect } from "react";

const Settings = () => {
  // default to "light" and "Arial"
  const storedTheme = localStorage.getItem("theme") || "light";
  const storedFont = localStorage.getItem("font") || "Arial";

  const [theme, setTheme] = useState(storedTheme);
  const [font, setFont] = useState(storedFont);

  // Effect to apply theme and font to the body when state changes
  useEffect(() => {
    document.body.className = theme;
    document.body.style.fontFamily = font;

    // Save theme and font selection to localStorage
    localStorage.setItem("theme", theme);
    localStorage.setItem("font", font);
  }, [theme, font]);

  // handle theme change
  const changeTheme = (selectedTheme) => {
    setTheme(selectedTheme); 
  };

  //handle font change
  const changeFont = (selectedFont) => {
    setFont(selectedFont); 
  };

  return (
    <div className="container mt-5">
      <h1>Settings</h1>

      {/* Theme Box */}
      <div className="card mb-3" style={{ width: "100%" }}>
        <div className="card-body">
          <h4 className="card-title text-start font-weight-bold">Select Theme</h4>
          <h2>Themes</h2>
          
          <div className="row mb-3">
            {/* Light Theme Preview */}
            <div className="col-6 text-center">
              <div
                style={{
                  backgroundColor: "#f0f0f0",
                  color: "#000",
                  padding: "20px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  height: "150px", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Light-Theme
              </div>
              <div></div>
              <button
                className="btn btn-light"
                onClick={() => changeTheme("light")}
              >
                Apply Light Theme
              </button>
            </div>

            {/* Dark Theme Preview */}
            <div className="col-6 text-center">
              <div
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  padding: "20px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  height: "150px", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Dark-Theme
              </div>
              <div></div>
              <button
                className="btn btn-dark text-white"
                onClick={() => changeTheme("dark")}
              >
                Apply Dark Theme
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Font Box */}
      <div className="card mb-3" style={{ width: "100%" }}>
        <div className="card-body">
          <h4 className="card-title text-start font-weight-bold">Select Font</h4>
           <h2>Fonts</h2>

          <div className="row">
            {/* Arial Font Preview */}
            <div className="col-6 text-center">
              <div
                style={{
                  fontFamily: "Arial",
                  padding: "20px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  height: "150px", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Arial
              </div>
              <div></div>
              <button
                className="btn btn-outline-primary"
                onClick={() => changeFont("Arial")}
              >
                Apply Arial Font
              </button>
            </div>

            {/* Courier New Font Preview */}
            <div className="col-6 text-center">
              <div
                style={{
                  fontFamily: "Courier New",
                  padding: "20px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  height: "150px", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Courier New
              </div>
              <div></div>
              <button
                className="btn btn-outline-secondary"
                onClick={() => changeFont("Courier New")}
              >
                Apply Courier New Font
              </button>
            </div>

            {/* Times New Roman Font Preview */}
            <div className="col-6 text-center">
              <div
                style={{
                  fontFamily: "Times New Roman",
                  padding: "20px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  height: "150px", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Times New Roman
              </div>
              <div></div>
              <button
                className="btn btn-outline-info"
                onClick={() => changeFont("Times New Roman")}
              >
                Apply Times New Roman Font
              </button>
            </div>

            {/* Georgia Font Preview */}
            <div className="col-6 text-center">
              <div
                style={{
                  fontFamily: "Georgia",
                  padding: "20px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Georgia
              </div>
              <div></div>
              <button
                className="btn btn-outline-danger"
                onClick={() => changeFont("Georgia")}
              >
                Apply Georgia Font
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
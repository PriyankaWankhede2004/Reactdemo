import React, { useState, useEffect } from "react";

const Profile = () => {
  // State variables
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [profession, setProfession] = useState("");
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({}); // For error messages
  const [successMessage, setSuccessMessage] = useState(""); // New success message state

  // Country list
  const countries = [
    { code: "IN", name: "India +91" },
    { code: "US", name: "United States +1" },
    { code: "UK", name: "United Kingdom +44" },
    { code: "AS", name: "Australia +61" },
    { code: "FR", name: "France +33" },
    { code: "IT", name: "Italy +39" },
  ];

  // Load saved profile data from localStorage
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile) {
      setFirstName(savedProfile.firstName || "");
      setMiddleName(savedProfile.middleName || "");
      setLastName(savedProfile.lastName || "");
      setEmail(savedProfile.email || "");
      setPhoneNumber(savedProfile.phoneNumber || "");
      setCountry(savedProfile.country || "");
      setProfession(savedProfile.profession || "");
      setImage(savedProfile.image || null);
    }
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save profile
  const handleSave = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First Name is required.";
    if (!lastName) newErrors.lastName = "Last Name is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    // If errors exist, set errors and stop saving
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const profileData = {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      country,
      profession,
      image,
    };

    localStorage.setItem("profile", JSON.stringify(profileData));

    // Set success message
    setSuccessMessage("Saved Profile Successfully");
    setTimeout(() => setSuccessMessage(""), 1000); // Clear the message after 3 seconds

    setIsEditing(false); // Close the editing form
    setErrors({});
  };

  // Handle remove image
  const handleRemoveImage = () => {
    setImage(null); // Remove the image from state
    document.querySelector('input[type="file"]').value = ''; // Clear the file input value
  };

  // Handle delete profile
  const handleDeleteProfile = () => {
    localStorage.removeItem("profile");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setCountry("");
    setProfession("");
    setImage(null);

    // Set success message for deletion
    setSuccessMessage("Profile deleted successfully!");
    setTimeout(() => setSuccessMessage(""), 1000); // Clear the message after 3 seconds

    setIsEditing(false); // Close the editing form
    setErrors({});
  };

  return (
    <div className="container mt-5">
      <h2>Profile</h2>

      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {/* Profile Display (Non-editable section) */}
      {!isEditing ? (
        <div>
          <div className="d-flex align-items-center mb-3">
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #ddd",
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span
                  style={{
                    lineHeight: "150px",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  +
                </span>
              )}
            </div>
            <div className="ms-3">
              <h4>{firstName} {middleName} {lastName}</h4>
              <div className="mb-3">
                <label>Email:</label>
                <div className="border p-2" style={{ width: "250px" }}>
                  {email}
                </div>
              </div>
              <div className="mb-3">
                <label>Phone Number:</label>
                <div className="border p-2" style={{ width: "250px" }}>
                  {country ? countries.find(c => c.code === country)?.name + " " + phoneNumber : " "}
                </div>
              </div>
              <div className="mb-3">
                <label>Profession:</label>
                <div className="border p-2" style={{ width: "250px" }}>
                  {profession || " "}
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        </div>
      ) : (
        // Edit Form
        <div>
          {/* Image Upload */}
          <div className="mb-3">
            <label>Upload Image</label>
            <div className="d-flex justify-content-center">
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid #ddd",
                }}
              >
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span style={{ lineHeight: "150px", textAlign: "center", display: "block" }}>+</span>
                )}
              </div>
            </div>
            <input type="file" className="form-control" onChange={handleImageUpload} />
            <button
              className="btn btn-danger mt-2"
              onClick={handleRemoveImage}
            >
              Remove Image
            </button>
          </div>

          {/* Name Fields */}
          <div className="mb-3">
            <label>First Name <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter firstname"
            />
            {errors.firstName && (
              <small style={{ color: "red" }}>{errors.firstName}</small>
            )}
          </div>
          <div className="mb-3">
            <label>Middle Name</label>
            <input
              type="text"
              className="form-control"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              placeholder="Enter middlename"
            />
          </div>
          <div className="mb-3">
            <label>Last Name <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter lastname"
            />
            {errors.lastName && (
              <small style={{ color: "red" }}>{errors.lastName}</small>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label>Email: <span style={{ color: 'red' }}>*</span></label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email(name@gmail.com)"
            />
            {errors.email && (
              <small style={{ color: "red" }}>{errors.email}</small>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <label>Phone Number:</label>
            <div className="d-flex">
              <select
                className="form-control w-25"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="form-control"
                value={country ? phoneNumber : ""}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={country ? "Enter Phone Number" : "Select Country First"}
                disabled={!country}
              />
            </div>
          </div>

          {/* Profession */}
          <div className="mb-3">
            <label>Profession:</label>
            <input
              type="text"
              className="form-control"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="Enter profession"
            />
          </div>

          {/* Delete Profile and Save Buttons */}
          <div className="d-flex justify-content-between gap-2">
            <button
              className="btn btn-danger"
              onClick={handleDeleteProfile}
            >
              Delete Profile
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
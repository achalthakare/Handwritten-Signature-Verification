import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const API_URL = "http://localhost:9090/api/auth/register"; // Ensure this matches your backend URL

function RegistrationPage() {
  const navigate = useNavigate(); // ✅ Use navigate function

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "", // ✅ Changed from mobileNo to mobile
    department: "",
    year: "",
    password: "",
    category: "student",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post(API_URL, formData);
      alert(response.data);
      navigate("/login"); // ✅ Corrected navigation
    } catch (error) {
      alert("Registration failed! Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headingStyle}>Register</h2>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Mobile No Input */}
        <input
          type="tel"
          name="mobile" // ✅ Changed from "mobileNo" to "mobile"
          placeholder="Enter your mobile number"
          value={formData.mobile}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Department */}
        <input
          type="text"
          name="department"
          placeholder="Enter your department"
          value={formData.department}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Year */}
        <input
          type="text"
          name="year"
          placeholder="Enter your year"
          value={formData.year}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Category Dropdown */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="student">Student</option>
          <option value="warden">Warden</option>
          <option value="hod">HOD</option>
        </select>

        {/* Register Button */}
        <button onClick={handleRegister} style={buttonStyle}>
          Register
        </button>
      </div>
    </div>
  );
}

// Styling
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const formStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  width: "320px",
  textAlign: "center",
};

const headingStyle = {
  color: "#222",
  marginBottom: "20px",
  fontWeight: "bold",
  fontSize: "22px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
  boxSizing: "border-box",
};

const buttonStyle = {
  backgroundColor: "#28a745",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer",
  width: "100%",
  transition: "background-color 0.3s ease",
};

export default RegistrationPage;

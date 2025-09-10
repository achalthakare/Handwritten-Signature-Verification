import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/verify"; // Flask API URL
const BACKEND_API_URL = "http://localhost:9090/api/leave/decision"; // Spring Boot API

function Warden() {
  const [studentEmail, setStudentEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [verificationResult, setVerificationResult] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [decision, setDecision] = useState(null);

  // Handle Student Email input
  const handleEmailChange = (e) => {
    setStudentEmail(e.target.value);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  // Upload file and verify signature
  const handleUploadAndVerify = async () => {
    if (!selectedFile || !studentEmail) {
      alert("Please enter Student Email and select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("email", studentEmail);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setVerificationResult(response.data.signature);
      setConfidence(response.data.confidence);
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Error verifying signature. Please try again.");
    }
  };

  // Handle leave decision (Approve or Deny)
  const handleDecision = async (status) => {
    setDecision(status);

    try {
      await axios.post(
        BACKEND_API_URL,
        { studentEmail, status: status.toUpperCase() }, // Send JSON body
        { headers: { "Content-Type": "application/json" } } // Set JSON header
      );

      alert(`Leave ${status.toUpperCase()}!`);
    } catch (error) {
      console.error("Error updating leave status:", error);
      alert("Failed to update leave decision.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "30px" }}>Verify Leave Request</h1>

        {/* Student Email Input */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Student Email:
          </label>
          <input
            type="email"
            value={studentEmail}
            onChange={handleEmailChange}
            placeholder="Enter student email"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Upload Section */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Upload Signature Image:
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              style={{
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginRight: "10px",
                cursor: "pointer",
                backgroundColor: "#e0e0e0",
              }}
            >
              Choose File
            </label>
            <span>{fileName}</span>
          </div>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleUploadAndVerify}
          style={{
            backgroundColor: "#673ab7",
            color: "white",
            padding: "12px 20px",
            border: "none",
            borderRadius: "5px",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          Upload & Verify
        </button>

        {/* Display Verification Result */}
        {verificationResult && (
          <div
            style={{
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor:
                verificationResult === "REAL" ? "#d4edda" : "#f8d7da",
              color: verificationResult === "REAL" ? "#155724" : "#721c24",
            }}
          >
            <strong>Signature: {verificationResult}</strong>
            <p>Confidence: {(confidence * 100).toFixed(2)}%</p>
          </div>
        )}

        {/* Decision Buttons */}
        {verificationResult && (
          <>
            <h2 style={{ marginBottom: "20px", textAlign: "left" }}>
              Decision
            </h2>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => handleDecision("approved")}
                style={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: "5px",
                  width: "48%",
                }}
                disabled={verificationResult === "FAKE"}
              >
                Approve Leave
              </button>
              <button
                onClick={() => handleDecision("denied")}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: "5px",
                  width: "48%",
                }}
              >
                Deny Leave
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Warden;

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:9090/api/leave/all"; // Backend API to get leave requests

function HeadOfDepartment() {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get(API_URL);
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Leave Requests</h1>

      <div style={{ width: "80%", maxWidth: "800px" }}>
        {leaveRequests.length === 0 ? (
          <p>No leave requests available.</p>
        ) : (
          leaveRequests.map((request, index) => (
            <div
              key={index}
              style={{
                backgroundColor:
                  request.status === "APPROVED" ? "#e6f4ea" : "#fce8e6",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "8px",
              }}
            >
              <h2
                style={{
                  marginBottom: "10px",
                  color: request.status === "APPROVED" ? "#0f9d58" : "#db4437",
                }}
              >
                {request.status === "APPROVED"
                  ? "Leave Approved"
                  : "Fake Signature Detected"}
              </h2>

              {/* 🔹 Student Details */}
              <p>
                <strong>Student Name:</strong> {request.studentName}
              </p>
              <p>
                <strong>Email:</strong> {request.studentEmail}
              </p>
              <p>
                <strong>Department:</strong> {request.department}
              </p>
              <p>
                <strong>Year:</strong> {request.year}
              </p>

              <p style={{ marginTop: "10px" }}>
                {request.status === "APPROVED"
                  ? `Leave has been approved.`
                  : "Leave application has a suspected fake signature. Please verify and take action."}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HeadOfDepartment;

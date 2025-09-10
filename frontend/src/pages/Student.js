import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_API_URL = "http://localhost:9090/api/leave/status";

function Student() {
  const [studentEmail, setStudentEmail] = useState(
    localStorage.getItem("mail")
  ); // Ensure email is set before request
  const [leaveStatus, setLeaveStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentEmail) {
      setLeaveStatus("No email found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchLeaveStatus = async () => {
      try {
        console.log("Fetching status for:", studentEmail);
        const response = await axios.get(`${BACKEND_API_URL}/${studentEmail}`);

        if (response.data && response.data.status) {
          setLeaveStatus(response.data.status.toUpperCase()); // Convert to uppercase for consistency
        } else {
          setLeaveStatus("No leave request found.");
        }
      } catch (error) {
        console.error("Error fetching leave status:", error);
        setLeaveStatus("Error fetching leave status.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveStatus();
  }, [studentEmail]); // Runs only when `studentEmail` is set

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
        <h2 style={{ marginBottom: "25px", fontSize: "20px" }}>
          Notifications
        </h2>

        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "left",
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                {leaveStatus === "APPROVED"
                  ? "✅ Your leave request has been approved."
                  : leaveStatus === "DENIED"
                  ? "❌ Your leave request has been denied."
                  : leaveStatus}
              </p>
              <p style={{ fontSize: "14px", color: "#666" }}>
                {new Date().toLocaleDateString()} {/* Show current date */}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Student;

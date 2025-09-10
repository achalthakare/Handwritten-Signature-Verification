import React from "react";

function HomeScreen() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0", // Light gray background
      }}
    >
      <div>
        <h1>HomeScreen</h1>
        <p>Welcome to the home page!</p>
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "30px" }}>Home</h1>
        <button
          style={{
            backgroundColor: "#4285f4", // Blue button color
            color: "white",
            padding: "15px 30px",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Login
        </button>
        <br />
        <button
          style={{
            backgroundColor: "#4285f4",
            color: "white",
            padding: "15px 30px",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;

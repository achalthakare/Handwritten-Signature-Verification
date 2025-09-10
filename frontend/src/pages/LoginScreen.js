import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const API_URL = "http://localhost:9090/api/auth/login";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // ✅ Change this to the correct default route
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(API_URL, { email, password });

      // 🔹 Extract token, email, and category
      const { token, category } = response.data;

      // 🔹 Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("mail", email);
      localStorage.setItem("category", category);

      alert("Login successful!");

      // 🔹 Redirect based on category
      if (category === "student") {
        navigate("/student");
      } else if (category === "warden") {
        navigate("/warden");
      } else if (category === "hod") {
        navigate("/headofdepartment");
      } else {
        setError("Unknown user category");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed! Check your credentials."
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#ECDFCC",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "350px",
        }}
      >
        <motion.h1
          style={{
            marginBottom: "20px",
            color: "#1E201E",
            fontFamily: "Arial, sans-serif",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Login
        </motion.h1>

        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

        <motion.input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          whileFocus={{ scale: 1.05 }}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            border: "1px solid #3C3D37",
            borderRadius: "8px",
            boxSizing: "border-box",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <motion.input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          whileFocus={{ scale: 1.05 }}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            border: "1px solid #3C3D37",
            borderRadius: "8px",
            boxSizing: "border-box",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <motion.button
          onClick={handleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            backgroundColor: "rgb(105,117,101)",
            color: "white",
            padding: "16px 30px",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Login
        </motion.button>

        <div style={{ marginTop: "15px", fontSize: "14px" }}>
          <p style={{ color: "#697565" }}>
            Don't have an account?{" "}
            <a href="/" style={{ color: "#1E201E", textDecoration: "none" }}>
              Sign Up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginScreen;

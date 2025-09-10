import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaHome,
  FaUser,
  FaUserPlus,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaBuilding,
  FaSignOutAlt,
} from "react-icons/fa";
import "./App.css"; // Import the CSS file

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCategory, setUserCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const category = localStorage.getItem("category");

    if (token) {
      setIsLoggedIn(true);
      setUserCategory(category);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mail");
    localStorage.removeItem("category");
    setIsLoggedIn(false);
    setUserCategory("");
    navigate("/login");
  };

  // Background styling object
  const appStyle = {
    position: "relative",
    backgroundColor: "#282c34", // Fallback background color
    backgroundImage: "url('/image.jpg')", // Ensure image is in the public folder
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={appStyle}> {/* Apply inline style here */}
      {/* Header Section */}
      <header className="bg-dark text-white text-center p-4 shadow">
        <h1 className="fw-bold">✍ Handwritten Signature Verification</h1>
        <nav className="mt-3">
          <div className="d-flex justify-content-center">
            <Link to="/" className="nav-link text-white px-3 fw-semibold">
              <FaHome className="me-1" /> Home
            </Link>

            {!isLoggedIn ? (
              <>
                <Link to="/login" className="nav-link text-white px-3 fw-semibold">
                  <FaUser className="me-1" /> Login
                </Link>
                <Link to="/registration" className="nav-link text-white px-3 fw-semibold">
                  <FaUserPlus className="me-1" /> Register
                </Link>
              </>
            ) : (
              <>
                {userCategory === "student" && (
                  <Link to="/student" className="nav-link text-white px-3 fw-semibold">
                    <FaGraduationCap className="me-1" /> Student
                  </Link>
                )}
                {userCategory === "hod" && (
                  <Link to="/headofdepartment" className="nav-link text-white px-3 fw-semibold">
                    <FaChalkboardTeacher className="me-1" /> Head of Department
                  </Link>
                )}
                {userCategory === "warden" && (
                  <Link to="/warden" className="nav-link text-white px-3 fw-semibold">
                    <FaBuilding className="me-1" /> Warden
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="btn btn-danger ms-3 fw-semibold"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <FaSignOutAlt className="me-1" /> Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container flex-grow-1 py-4">
        <Outlet />
      </main>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Handwritten Signature Verification |
          Made By 3rd Year
        </p>
      </footer>
    </div>
  );
}

export default App;

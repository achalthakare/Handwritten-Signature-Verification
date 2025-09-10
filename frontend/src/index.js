import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import HeadOfDepartment from './pages/HeadOfDepartment';
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import Student from './pages/Student';
import RegistrationPage from './pages/RegistrationPage';
import Warden from './pages/Warden';


import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Home",
    element: <HomeScreen />,
  },
  {
    path: "/Login",
    element: <LoginScreen />,
  },
  {
    path: "/Registration",
    element: <RegistrationPage />, // Corrected typo
  },
  
  
  
  {
    path: "/HeadOfDepartment",
    element: <HeadOfDepartment />,
  },
  {
    path: "/Student",
    element: <Student />,
  },
  {
    path: "/Warden",
    element: <Warden />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
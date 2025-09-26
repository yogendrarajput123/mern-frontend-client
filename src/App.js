import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";
import { ToastContainer } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // hide navbar with login/sign page
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      {!hideNavbar && <Navbar isAuthenticated={isAuthenticated} />}
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/create" />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/create" />}
        />

        {/* Private routes */}
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />
        <Route
          path="/read"
          element={
            <PrivateRoute>
              <Read />
            </PrivateRoute>
          }
        />
        <Route
          path="/update/:_id"
          element={
            <PrivateRoute>
              <Update />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/create" : "/login"} />}
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default App;

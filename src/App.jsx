import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Dashboard from "./dashboard";
import Board from "./board";
import AdminPanel from "./adminpanel";
import Profile from "./profile";
import NotFound from "./notfound";
import "./App.css";
import Layout from "./components/layout";
import ProtectedRoute from "./components/protectedroutes";
import Register from "./register";
import Settings from "./settings";


function App() {
  useEffect(() => {
    // Initialize admin user if missing
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const adminExists = users.some(user => user.role === "admin");

    if (!adminExists) {
      const defaultAdmin = {
        username: "admin",
        password: "admin123",
        role: "admin",
      };
      users.push(defaultAdmin);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/board/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <Board />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminpanel"
          element={
            <ProtectedRoute adminOnly={true}>
              <Layout>
                <AdminPanel />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

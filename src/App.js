import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard";
import { useAuth } from "./contexts/AuthContexts";
import AppLayout from "./Layouts/AppLayout";
import MenuPage from "./pages/Menu";
import "./index.css";
import BiroHukumPage from "./pages/BiroHukum";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      {/* <Route
        path="/dashboard"
        element={
          <AppLayout>
            <DashboardPage />
          </AppLayout>
        }
      /> */}
      <Route
        path="/satuan-kerja"
        element={
          <AppLayout>
            <MenuPage />
          </AppLayout>
        }
      />
      <Route
        path="/biro-hukum"
        element={
          <AppLayout>
            <BiroHukumPage />
          </AppLayout>
        }
      />
    </Routes>
  );
}

export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./contexts/AuthContexts";
import AppLayout from "./Layouts/AppLayout";
import MenuPage from "./pages/Menu";
import BiroHukumPage from "./pages/BiroHukum";
import { ToastContainer } from "react-toastify";
import CompilationPage from "./pages/Compilation";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
// import "@/PDFWorkerSetup";

function App() {
  const { user } = useAuth();

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
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
        <Route
          path="/compilation"
          element={
            <AppLayout>
              <CompilationPage />
            </AppLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;

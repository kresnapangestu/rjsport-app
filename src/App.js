import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./contexts/AuthContexts";
import AppLayout from "./Layouts/AppLayout";
import MenuPage from "./pages/Menu";
import ListSatuanKerjaPage from "./pages/ListSatuankerja";
import { ToastContainer } from "react-toastify";
import CompilationPage from "./pages/Compilation";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import UserManagementPage from "./pages/UserManagement";
// import "@/PDFWorkerSetup";

function App() {
  const { user } = useAuth();

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/satuan-kerja" /> : <LoginPage />}
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
          path="/satuan-kerja/biro-hukum"
          element={
            <AppLayout>
              <ListSatuanKerjaPage />
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
        <Route
          path="/user-management"
          element={
            <AppLayout>
              <UserManagementPage />
            </AppLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;

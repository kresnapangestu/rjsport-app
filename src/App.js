import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./contexts/AuthContexts";
import AppLayout from "./Layouts/AppLayout";
import ListSatuanKerjaPage from "./pages/ListSatuankerja";
import { ToastContainer } from "react-toastify";
import CompilationPage from "./pages/Compilation";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import UserManagementPage from "./pages/UserManagement";
import MenuPage from "./pages/Menu";
import { fetchUser } from "./pages/Menu/menuHooks";
import { AppContext } from "./contexts/AppContext";
// import "@/PDFWorkerSetup";

function App() {
  const { user } = useAuth();
  const { setUserData, isAdmin } = useContext(AppContext);

  console.log("asdasd");

  useEffect(() => {
    console.log("asdasd", "asdasdasd");
    const loadUser = async () => {
      try {
        const userData = await fetchUser();
        setUserData(userData.data);
      } catch (error) {
        console.error("Error loading menu:", error);
      }
    };

    loadUser();
  }, [setUserData]);

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
            <AppLayout isAdmin={isAdmin}>
              <MenuPage />
            </AppLayout>
          }
        />
        <Route
          path="/satuan-kerja/biro-hukum"
          element={
            <AppLayout isAdmin={isAdmin}>
              <ListSatuanKerjaPage />
            </AppLayout>
          }
        />
        <Route
          path="/satuan-kerja/biro-keuangan"
          element={
            <AppLayout isAdmin={isAdmin}>
              <ListSatuanKerjaPage />
            </AppLayout>
          }
        />
        <Route
          path="/satuan-kerja/biro-osdma"
          element={
            <AppLayout isAdmin={isAdmin}>
              <ListSatuanKerjaPage />
            </AppLayout>
          }
        />
        <Route
          path="/satuan-kerja/biro-perencanaan"
          element={
            <AppLayout isAdmin={isAdmin}>
              <ListSatuanKerjaPage />
            </AppLayout>
          }
        />
        <Route
          path="/satuan-kerja/biro-umum"
          element={
            <AppLayout isAdmin={isAdmin}>
              <ListSatuanKerjaPage />
            </AppLayout>
          }
        />
        <Route
          path="/satuan-kerja/biro-humas"
          element={
            <AppLayout isAdmin={isAdmin}>
              <ListSatuanKerjaPage />
            </AppLayout>
          }
        />
        <Route
          path="/satuan-kerja/biro-ppsdm"
          element={
            <AppLayout isAdmin={isAdmin}>
              <ListSatuanKerjaPage />
            </AppLayout>
          }
        />
        <Route
          path="/satuan-kerja/biro-poltek"
          element={
            <AppLayout isAdmin={isAdmin}>
              <ListSatuanKerjaPage />
            </AppLayout>
          }
        />
        <Route
          path="/compilation"
          element={
            <AppLayout isAdmin={isAdmin}>
              <CompilationPage />
            </AppLayout>
          }
        />
        <Route
          path="/user-management"
          element={
            <AppLayout isAdmin={isAdmin}>
              <UserManagementPage />
            </AppLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;

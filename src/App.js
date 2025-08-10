import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./Layouts/AppLayout";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import MenuPage from "./pages/InvoiceMaker";
import LKPMakerPage from "./pages/LKPMaker";
import PrivateRoute from "./components/PrivateRoute";
// import "@/PDFWorkerSetup";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/" element={<Navigate to="/invoice-maker" />} />
        <Route
          path="/invoice-maker"
          element={
            <AppLayout>
              <MenuPage />
            </AppLayout>
          }
        />
        <Route
          path="/lembar-kerja-produksi-maker"
          element={
            <AppLayout>
              <LKPMakerPage />
            </AppLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;

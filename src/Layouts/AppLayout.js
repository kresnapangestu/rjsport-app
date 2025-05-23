import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AppLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <div style={{ marginLeft: "230px", padding: "1rem" }}>{children}</div>
      </div>
    </div>
  );
}

export default AppLayout;

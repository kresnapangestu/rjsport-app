import React from "react";
import { useAuth } from "../contexts/AuthContexts";

function Navbar() {
  const { logout } = useAuth();

  return (
    <div
      style={{
        background: "#ddd",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>Welcome, "Guest"</div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;

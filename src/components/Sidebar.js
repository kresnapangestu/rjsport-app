import { Archive, Building, Layers, LogOut } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  //   { name: "Dashboard", path: "/dashboard" },
  { name: "Satuan Kerja", path: "/satuan-kerja", icon: <Building /> },
  { name: "Arsip", path: "/archieve", icon: <Archive /> },
  { name: "Kompilasi", path: "/compilation", icon: <Layers /> },
];

function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "#15406A",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div>
        <img
          //   src="/logo-kemnaker.png"
          alt="logo"
          width="180"
          height="60"
          style={{ marginBottom: "2rem" }}
        ></img>
        <nav>
          {menuItems.map((item) => (
            <div>
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link${isActive ? " active" : ""}`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </div>
          ))}
        </nav>
      </div>
      <button
        // onClick={handleLogout}
        style={{
          marginBottom: "2rem",
          background: "none",
          border: "none",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          padding: "0.5rem 1rem",
        }}
      >
        <LogOut />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;

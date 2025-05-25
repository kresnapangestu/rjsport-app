import { Archive, Building, Layers, LogOut, UserRoundCog } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Satuan Kerja",
    path: "/satuan-kerja",
    icon: <Building />,
    adminOnly: false,
  },
  {
    name: "Kompilasi",
    path: "/compilation",
    icon: <Layers />,
    adminOnly: true,
  },
  {
    name: "Manajemen Akun",
    path: "/user-management",
    icon: <UserRoundCog />,
    adminOnly: true,
  },
];

function Sidebar({ isAdmin }) {
  const navigate = useNavigate();

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
      <div style={{ justifyItems: "center" }}>
        <img
          src="/logo-kemnaker.png"
          alt="logo"
          width="160"
          style={{ marginBottom: "2rem" }}
        ></img>
        <nav>
          {menuItems
            .filter((item) => isAdmin || !item.adminOnly) // show all if admin, only non-admin if not
            .map((item) => (
              <div key={item.path}>
                <NavLink
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
      <span
        className="logout-button"
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        <LogOut />
        Logout
      </span>
    </div>
  );
}

export default Sidebar;

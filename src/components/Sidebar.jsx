import { FileText, Layers, LogOut, UserRoundCog } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Invoice Maker",
    path: "/invoice-maker",
    icon: <FileText />,
    adminOnly: false,
  },
  {
    name: "Lembar Kerja Produksi",
    path: "/lembar-kerja-produksi-maker",
    icon: <FileText />,
    adminOnly: false,
  },
];

function Sidebar({ isAdmin }) {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "#2AC6EE",
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
        <div>
          <img
            src="/rjsport-logo.png"
            alt="logo"
            width="160"
            style={{ marginBottom: "2rem" }}
          />
        </div>
        <nav>
          {menuItems.map((item) => (
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
    </div>
  );
}

export default Sidebar;

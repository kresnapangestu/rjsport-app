import { LayoutDashboard } from "lucide-react";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Breadcrumbs = ({ items }) => {
  const location = useLocation();
  if (!items || items.length === 0) return null;

  const isActivePath = (path) => {
    return path === location.pathname;
  };

  return (
    <nav
      aria-label="breadcrumb"
      style={{
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        placeItems: "center",
        gap: "8px",
        marginBottom: "2%",
      }}
    >
      <NavLink to={"/satuan-kerja"} style={{ textDecoration: "none" }}>
        <LayoutDashboard size={20} />
      </NavLink>
      <span style={{ margin: "0 8px" }}>/</span>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const active = isActivePath(item.path);

        return (
          <div
            key={index}
            style={{
              display: "inline-flex",
              placeItems: "center",
            }}
          >
            {!isLast && item.path ? (
              <NavLink
                to={item.path}
                style={{
                  textDecoration: "none",
                  fontWeight: active ? "900" : "normal",
                  color: active ? "#000" : undefined,
                  cursor: "pointer",
                }}
              >
                {item.name}
              </NavLink>
            ) : (
              <NavLink
                to={item.path}
                aria-current="page"
                style={{
                  textDecoration: "none",
                  fontWeight: active ? "500" : "normal",
                  color: active ? "#15406A" : undefined,
                  cursor: "pointer",
                }}
              >
                {item.name}
              </NavLink>
            )}

            {!isLast && <span style={{ margin: "0 8px" }}>/</span>}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;

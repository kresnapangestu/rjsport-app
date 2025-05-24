import React from "react";
import { X } from "lucide-react";

function Chip({
  label,
  onDelete,
  variant = "filled",
  className = "",
  style = {},
}) {
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "0.875rem", // text-sm
    padding: "4px 12px",
    borderRadius: "9999px",
    fontWeight: "500",
    ...style,
  };

  const deleteButtonStyle = {
    marginLeft: "8px",
    padding: "2px",
    borderRadius: "9999px",
    background: "transparent",
    cursor: "pointer",
    transition: "background 0.2s ease-in-out",
  };

  const hoverStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  };

  return (
    <span
      style={{
        ...baseStyle,
      }}
      className={className}
    >
      {label}
      {onDelete && (
        <button
          onClick={onDelete}
          style={deleteButtonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, deleteButtonStyle)}
        >
          <X size={16} />
        </button>
      )}
    </span>
  );
}

export default Chip;

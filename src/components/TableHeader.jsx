import React from "react";

function TableHeader({ children }) {
  const headerStyle = {
    backgroundColor: "#2AC6EE",
    textAlign: "left",
    padding: "0.75rem 1rem",
    fontWeight: 600,
    color: "#white",
    borderBottom: "1px solid #e0e0e0",
  };
  return <thead style={headerStyle}>{children}</thead>;
}

export default TableHeader;

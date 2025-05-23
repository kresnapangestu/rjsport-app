import React from "react";

function Title({ children }) {
  return (
    <div
      style={{
        background: "#3F73A0",
        color: "white",
        padding: "1rem",
        borderRadius: 4,
        fontWeight: "bold",
        fontSize: "1.25rem",
        marginBottom: "1rem",
      }}
    >
      {children}
    </div>
  );
}

export default Title;

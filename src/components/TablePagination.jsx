import React from "react";

function TablePagination({ page, totalPages, onPageChange }) {
  const containerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "1rem",
    gap: "0.5rem",
  };

  const buttonStyle = {
    padding: "6px 12px",
    borderRadius: "4px",
    backgroundColor: "#eeeeee",
    border: "1px solid #ccc",
    color: "#333",
    cursor: "pointer",
    fontSize: "0.875rem",
    transition: "background-color 0.2s ease",
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    opacity: 0.5,
    cursor: "not-allowed",
  };

  const infoTextStyle = {
    fontSize: "0.875rem",
    color: "#666",
  };

  return (
    <div style={containerStyle}>
      <button
        onClick={() => onPageChange(Math.max(0, page - 1))}
        style={page === 0 ? disabledButtonStyle : buttonStyle}
        disabled={page === 0}
      >
        Prev
      </button>
      <span style={infoTextStyle}>
        Page {page + 1} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
        style={page >= totalPages - 1 ? disabledButtonStyle : buttonStyle}
        disabled={page >= totalPages - 1}
      >
        Next
      </button>
    </div>
  );
}

export default TablePagination;

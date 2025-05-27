import React from "react";

function TablePagination({
  page,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}) {
  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
    margin: "0 0.875rem",
    color: "#66",
  };

  const selectStyle = {
    padding: "6px",
    fontSize: "0.875rem",
  };

  return (
    <div style={containerStyle}>
      <div>
        <label>
          Rows per page:{" "}
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            style={selectStyle}
          >
            {[5, 10, 25, 50].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
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
    </div>
  );
}

export default TablePagination;

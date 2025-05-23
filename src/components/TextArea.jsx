import React, { useState } from "react";
import PropTypes from "prop-types";

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  helperText = "",
  name,
  rows = 4,
  style,
}) {
  const [isFocused, setFocused] = useState(false);
  const showFloatingLabel = isFocused || value;

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginBottom: "1.5rem",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    width: "100%",
  };

  const labelStyle = {
    position: "absolute",
    top: showFloatingLabel ? "-0.6rem" : "0.9rem",
    left: "0.75rem",
    fontSize: showFloatingLabel ? "0.75rem" : "1rem",
    color: error ? "#d32f2f" : isFocused ? "#3f51b5" : "#777",
    backgroundColor: "white",
    padding: "0 4px",
    transition: "all 0.2s ease",
    pointerEvents: "none",
  };

  const textareaStyle = {
    padding: "0.75rem",
    fontSize: "1rem",
    border: `1px solid ${error ? "#d32f2f" : isFocused ? "#3f51b5" : "#ccc"}`,
    borderRadius: "4px",
    backgroundColor: disabled ? "#f5f5f5" : "white",
    color: disabled ? "#999" : "#333",
    resize: "vertical",
    minHeight: `${rows * 1.5}rem`,
    transition: "border-color 0.2s ease",
    ...style,
  };

  const helperTextStyle = {
    fontSize: "0.75rem",
    color: error ? "#d32f2f" : "#777",
    marginTop: "0.25rem",
    marginLeft: "0.25rem",
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={showFloatingLabel ? placeholder : ""}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={textareaStyle}
        rows={rows}
      />
      {helperText && <div style={helperTextStyle}>{helperText}</div>}
    </div>
  );
}

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  rows: PropTypes.number,
  style: PropTypes.object,
};

export default Textarea;

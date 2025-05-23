import React, { useState } from "react";
import PropTypes from "prop-types";

function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  helperText = "",
  name,
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

  const inputStyle = {
    // width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    color: "#333",
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
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={showFloatingLabel ? placeholder : ""}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={inputStyle}
      />
      {helperText && <div style={helperTextStyle}>{helperText}</div>}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  style: PropTypes.object,
};

export default Input;

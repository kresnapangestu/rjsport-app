import React, { useState } from "react";
import PropTypes from "prop-types";

function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder,
  disabled = false,
  error = false,
  helperText = "",
  style,
}) {
  const [isFocused, setFocused] = useState(false);
  const showFloatingLabel = isFocused || value;

  const containerStyle = {
    position: "relative",
    marginBottom: "1.5rem",
    fontFamily: "Arial, sans-serif",
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

  const selectStyle = {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    border: `1px solid ${error ? "#d32f2f" : isFocused ? "#3f51b5" : "#ccc"}`,
    borderRadius: "4px",
    backgroundColor: disabled ? "#f5f5f5" : "#fff",
    color: disabled ? "#999" : "#333",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l5 6 5-6H0z' fill='%23333'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.75rem center",
    backgroundSize: "10px 6px",
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
      <label htmlFor={name} style={labelStyle}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        style={selectStyle}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && <div style={helperTextStyle}>{helperText}</div>}
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ).isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  style: PropTypes.object,
};

export default Select;

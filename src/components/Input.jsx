import React, { useState } from "react";
import PropTypes from "prop-types";
import { requiredValidator } from "@/services/GeneralHelper";

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
  validate = () => "",
  required = false,
}) {
  const [isFocused, setFocused] = useState(false);
  const [localError, setLocalError] = useState("");

  const runValidation = (val) => {
    const validators = [];

    if (required) validators.push(requiredValidator(label)); // use label as field name
    if (validate) validators.push(validate);

    for (const fn of validators) {
      const result = fn(val);
      if (result) return result;
    }

    return "";
  };

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(e);
    const errorMessage = runValidation(val);
    setLocalError(errorMessage);
  };

  const handleBlur = () => {
    setFocused(false);
    const errorMessage = runValidation(value);
    setLocalError(errorMessage);
  };

  const showFloatingLabel = isFocused || value;

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginBottom: "1.5rem",
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
    color: error || localError ? "#d32f2f" : "#777",
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
        onChange={handleChange}
        placeholder={showFloatingLabel ? placeholder : ""}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        style={inputStyle}
      />
      {(helperText || localError) && (
        <div style={helperTextStyle}>{localError || helperText}</div>
      )}
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
  validate: PropTypes.func,
  required: PropTypes.bool,
};

export default Input;

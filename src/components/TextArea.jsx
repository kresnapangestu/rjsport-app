import React, { useState } from "react";
import PropTypes from "prop-types";
import { requiredValidator } from "@/services/GeneralHelper";

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
  validate,
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
    console.log(e.target.value);
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
    color: error || localError ? "#d32f2f" : "#777",
    marginTop: "0.25rem",
    marginLeft: "0.25rem",
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{label}</label>
      <textarea
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
  validate: PropTypes.func,
  required: PropTypes.bool,
};

export default Textarea;

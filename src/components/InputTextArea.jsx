import React, { useState } from "react";
import PropTypes from "prop-types";
import { requiredValidator } from "@/services/GeneralHelper";

function InputTextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  helperText = "",
  className,
  style,
  validate = () => "",
  required = false,
  rows = 4,
}) {
  const [isFocused, setFocused] = useState(false);
  const [localError, setLocalError] = useState("");

  const showFloatingLabel = isFocused || value;

  const runValidation = (val) => {
    const validators = [];

    if (required) validators.push(requiredValidator(label));
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

  const containerStyle = {
    width: style?.width ?? "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    ...style,
  };

  const labelStyle = {
    position: "absolute",
    top: showFloatingLabel ? "-0.6rem" : "0.7rem",
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
    border: "1px solid #ccc",
    borderRadius: "4px",
    height: "50px",
    // lineHeight: "6px",
    backgroundColor: "#fff",
    color: "#333",
    resize: "vertical",
  };

  const helperTextStyle = {
    fontSize: "0.75rem",
    color: error || localError ? "#d32f2f" : "#777",
    marginTop: "0.25rem",
    marginLeft: "0.25rem",
  };

  return (
    <div style={containerStyle} className={className}>
      <label style={labelStyle}>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={showFloatingLabel ? placeholder : ""}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        rows={rows}
        style={textareaStyle}
      />
      {(helperText || localError) && (
        <div style={helperTextStyle}>{localError || helperText}</div>
      )}
    </div>
  );
}

InputTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  validate: PropTypes.func,
  required: PropTypes.bool,
  rows: PropTypes.number,
};

export default InputTextArea;

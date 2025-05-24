import React, { useState } from "react";
import PropTypes from "prop-types";
import { requiredValidator } from "../services/GeneralHelper";
import themeColors from "../constants/color";

function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = `Pilih ${label} dari opsi berikut`,
  disabled = false,
  error = false,
  helperText = "",
  style,
  validate,
  required = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleOptionClick = (val) => {
    if (val === value) {
      handleChange({ target: { name, value: "" } }); // unselect
    } else {
      handleChange({ target: { name, value: val } });
    }
    setIsOpen(false);
  };

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const containerStyle = {
    position: "relative",
    marginBottom: "1.5rem",
    width: "100%",
  };

  const labelStyle = {
    position: "absolute",
    top: placeholder ? "-0.6rem" : "0.9rem",
    left: "0.75rem",
    fontSize: placeholder ? "0.75rem" : "1rem",
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
    color: error || localError ? "#d32f2f" : "#777",
    marginTop: "0.25rem",
    marginLeft: "0.25rem",
  };

  return (
    <div style={containerStyle}>
      <label htmlFor={name} style={labelStyle}>
        {label}
      </label>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{
          padding: "0.75rem",
          border: `1px solid ${error ? "#d93025" : "#ccc"}`,
          borderRadius: "4px",
          backgroundColor: disabled ? "#f5f5f5" : "#fff",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {selectedLabel || <span style={{ color: "#999" }}>{placeholder}</span>}
      </div>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: themeColors.background,
            zIndex: 10,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleOptionClick(opt.value)}
              style={{
                padding: "0.75rem",
                color:
                  opt.value === value
                    ? themeColors.card
                    : themeColors.primary.light,
                backgroundColor:
                  opt.value === value
                    ? themeColors.primary.light
                    : themeColors.background,
                cursor: "pointer",
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
      {(helperText || localError) && (
        <div style={helperTextStyle}>{localError || helperText}</div>
      )}
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
  validate: PropTypes.func,
  required: PropTypes.bool,
};

export default Select;

import React, { useState } from "react";
import PropTypes from "prop-types";
import themeColors from "../constants/color";
import { requiredValidator } from "../services/GeneralHelper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FileInput({
  label = "Upload File",
  name,
  onChange,
  accept = "*",
  required = false,
  style = {},
  helperText = "",
  validate,
}) {
  const [loading, setLoading] = useState(false);
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

  const handleChange = async (e) => {
    const file = e.target.files[0];
    onChange(e); // propagate the event first

    const errorMessage = runValidation(file?.name);
    setLocalError(errorMessage);

    if (errorMessage) return;

    try {
      setLoading(true);
      toast.info("Uploading file...");

      // simulate upload with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    padding: "1rem",
    border: `1px dotted ${themeColors.primary.default}`,
    borderRadius: 5,
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    color: "#333",
  };

  const inputStyle = {
    padding: "0.5rem 0",
    fontSize: "1rem",
    ...style,
  };

  const helperTextStyle = {
    fontSize: "0.75rem",
    color: localError ? "#d32f2f" : "#777",
    marginTop: "0.25rem",
    marginLeft: "0.25rem",
  };

  return (
    <div style={containerStyle}>
      <label htmlFor={name} style={labelStyle}>
        {label}
      </label>
      <input
        id={name}
        type="file"
        name={name}
        onChange={handleChange}
        accept={accept}
        disabled={loading}
        style={inputStyle}
      />
      {(helperText || localError) && (
        <div style={helperTextStyle}>{localError || helperText}</div>
      )}
    </div>
  );
}

FileInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  validate: PropTypes.func,
};

export default FileInput;

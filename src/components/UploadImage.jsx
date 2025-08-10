// src/components/atoms/UploadImage.js

import React, { useState } from "react";
import PropTypes from "prop-types";

const UploadImage = ({ onChange, label = "Upload Gambar", name }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Hanya file gambar yang diperbolehkan.");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onChange(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative w-full">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded border mb-2"
          />
        ) : null}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          name={name}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
      </div>
    </div>
  );
};

UploadImage.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default UploadImage;

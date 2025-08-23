// src/components/atoms/UploadImage.js

import React, { useState } from "react";
import PropTypes from "prop-types";

const UploadImage = ({
  onChange,
  label = "Upload Gambar",
  name,
  maxImages = 2,
}) => {
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Filter only images
    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    if (validFiles.length !== files.length) {
      alert("Hanya file gambar yang diperbolehkan.");
    }

    // Limit based on maxImages
    const newFiles = validFiles.slice(0, maxImages - previewUrls.length);

    const newPreviews = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const updatedPreviews = [...previewUrls, ...newPreviews];
    setPreviewUrls(updatedPreviews);

    // Call parent onChange with actual File objects
    onChange(updatedPreviews.map((item) => item.file));

    // Reset input to allow re-uploading same file
    e.target.value = "";
  };

  const handleRemove = (index) => {
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(updatedPreviews);
    onChange(updatedPreviews.map((item) => item.file));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {/* Previews */}
      <div className="flex flex-wrap gap-2 mb-2">
        {previewUrls.map((item, index) => (
          <div key={index} className="relative">
            <img
              src={item.url}
              alt={`Preview ${index}`}
              className="w-32 h-32 object-cover rounded border"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Input */}
      {previewUrls.length < maxImages && (
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          name={name}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
      )}
    </div>
  );
};

UploadImage.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  maxImages: PropTypes.number,
};

export default UploadImage;

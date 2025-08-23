// src/context/ThemeContext.js
import { createContext, useContext, useState } from "react";

export const LKPContext = createContext();

// Custom Provider
export const LKPProvider = ({ children }) => {
  const [toggle, setToggle] = useState(true);
  const [invoiceData, setLKPData] = useState({
    orderName: "",
    material: "",
    items: [],
    sizeDetails: "",
    image: [], // array of File objects
    sizeChart: null, // array of File objects
  });

  const toggleLKP = () => setToggle((prev) => !prev);

  const updateLKPField = (key, value) => {
    console.log(key, value);
    setLKPData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageChange = (type, files) => {
    console.log(type, files);
    if (type.includes("Produk")) {
      if (Array.isArray(files)) {
        setLKPData((prev) => ({
          ...prev,
          image: files, // store all files as array
        }));
      }
    } else {
      setLKPData((prev) => ({
        ...prev,
        sizeChart: files, // store all files as array
      }));
    }
  };

  const addLKPItem = () => {
    setLKPData((prev) => ({
      ...prev,
      items: [...prev.items, ""],
    }));
  };

  const updateLKPItemField = (index, value) => {
    setLKPData((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index] = value;
      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const deleteLKPItem = (indexToRemove) => {
    setLKPData((prev) => ({
      ...prev,
      items: prev.items.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <LKPContext.Provider
      value={{
        toggle,
        toggleLKP,
        invoiceData,
        updateLKPField,
        addLKPItem,
        handleImageChange,
        updateLKPItemField,
        deleteLKPItem,
      }}
    >
      {children}
    </LKPContext.Provider>
  );
};

// src/context/ThemeContext.js
import { createContext, useContext, useState } from "react";

export const InvoiceContext = createContext();

// Custom Provider
export const InvoiceProvider = ({ children }) => {
  const [toggle, setToogle] = useState(true);
  const [invoiceData, setInvoiceData] = useState({
    number: "",
    client: "",
    items: [{ description: "", size: "", qty: "", price: "" }],
    date: null,
    downPayment: null,
    totalAmount: null,
    image: [], // now an array of File objects
  });

  const toggleInvoice = () => setToogle(!toggle);

  const updateInvoiceField = (key, value) => {
    console.log(key, value);
    setInvoiceData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ⬇️ updated for multiple images
  const handleImageChange = (files) => {
    if (Array.isArray(files)) {
      setInvoiceData((prev) => ({
        ...prev,
        image: files, // store all files as array
      }));
    }
  };

  const addInvoiceItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", size: "", qty: "", price: "" }],
    }));
  };

  const updateInvoiceItemField = (index, field, value) => {
    setInvoiceData((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };
      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const deleteInvoiceItem = (indexToRemove) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <InvoiceContext.Provider
      value={{
        toggle,
        toggleInvoice,
        invoiceData,
        updateInvoiceField,
        addInvoiceItem,
        handleImageChange, // updated
        updateInvoiceItemField,
        deleteInvoiceItem,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

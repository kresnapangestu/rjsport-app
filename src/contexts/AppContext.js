import { fetchMenu, fetchUser } from "@/pages/InvoiceMaker/menuHooks";
import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menuName, setMenuName] = useState("");
  const [listMenu, setListMenu] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  console.log(listMenu);

  const handleChangeMenu = (value) => {
    setMenuName(value);
  };

  return (
    <AppContext.Provider
      value={{
        menuName,
        handleChangeMenu,
        listMenu,
        setListMenu,
        userData,
        setUserData,
        // isAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

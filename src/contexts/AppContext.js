import { fetchUser } from "@/pages/Menu/menuHooks";
import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menuName, setMenuName] = useState("");
  const [listMenu, setListMenu] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const handleChangeMenu = (value) => {
    setMenuName(value);
  };
  useEffect(() => {
    if (userData) {
      if (userData?.role !== "user") {
        setIsAdmin(true);
      }
    }
  }, [userData]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser();
        setUserData(userData.data);
      } catch (error) {
        console.error("Error loading menu:", error);
      }
    };

    loadUser();
  }, [setUserData]);

  return (
    <AppContext.Provider
      value={{
        menuName,
        handleChangeMenu,
        listMenu,
        setListMenu,
        userData,
        setUserData,
        isAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

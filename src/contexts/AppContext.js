import { fetchMenu, fetchUser } from "@/pages/Menu/menuHooks";
import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menuName, setMenuName] = useState("");
  const [listMenu, setListMenu] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const loadMenu = async () => {
        try {
          const menuData = await fetchMenu();
          setListMenu(menuData.data);
        } catch (error) {
          console.error("Error loading menu:", error);
        }
      };

      loadMenu();
    }
  }, [setListMenu, token]);

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
    if (token) {
      const loadUser = async () => {
        try {
          const userData = await fetchUser();
          setUserData(userData.data);
        } catch (error) {
          console.error("Error loading menu:", error);
        }
      };

      loadUser();
    }
  }, [setUserData, token]);

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

import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";
import { AppContext } from "@/contexts/AppContext";
import { isAuthorizedRoute } from "@/services/GeneralHelper";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  const { userData, listMenu } = useContext(AppContext);
  const location = useLocation();
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    if (!token) {
      window.location.replace("/");
      return;
    }

    const menus = [
      ...listMenu,
      { path: "/satuan-kerja" },
      { path: "/" },
      { path: "/compilation" },
      { path: "/user-management" },
    ];

    const allowed = isAuthorizedRoute(location.pathname, userData, menus);

    if (!allowed) {
      window.location.replace("/satuan-kerja");
      return;
    }

    setIsAllowed(true);
  }, [token, userData, listMenu, location.pathname]);

  // Jangan render apa pun sampai izin dicek
  if (isAllowed === null) return null;

  return children;
};

export default PrivateRoute;

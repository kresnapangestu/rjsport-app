import React from "react";
// import { useAuth } from "../auth/AuthContext";
import { useAuth } from "../contexts/AuthContexts";

function DashboardPage() {
  const { user, logout } = useAuth();

  return <div>"omoi"</div>;
}

export default DashboardPage;

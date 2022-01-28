import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const user = useSelector((state) => state.user.currentUser);

  return user ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  if (!accessToken) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;

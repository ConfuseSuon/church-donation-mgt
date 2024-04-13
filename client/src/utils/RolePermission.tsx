import { Spin } from "antd";
import React from "react";
import { Navigate } from "react-router-dom";

interface RolePermission {
  children: React.ReactNode;
  requiredRole: string;
  loggedUserData: any;
}

const RolePermission = (props: RolePermission) => {
  const { children, requiredRole, loggedUserData } = props;

  return loggedUserData ? (
    loggedUserData.role === requiredRole ? (
      children
    ) : (
      <Navigate to="/login" />
    )
  ) : (
    <Spin spinning={true} />
  );
};

export default RolePermission;

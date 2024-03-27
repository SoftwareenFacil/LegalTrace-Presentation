// AdminRoute.jsx

import React from 'react';
import { Navigate , Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const AdminRoute = () => {

  const token = Cookies.get("token");
  const decoded = jwtDecode(token);
  const isAdmin = decoded.SuperAdmin === "True";

  return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default AdminRoute;

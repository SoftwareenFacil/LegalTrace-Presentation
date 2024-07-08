// AdminRoute.jsx

import React from 'react';
import { Navigate , Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const AdminRoute = () => {

  const token = Cookies.get("token");
//   const decoded = jwtDecode(token);
//   const isAdmin = decoded.SuperAdmin === "True";

//   return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" replace />;
// };
if (!token) {
  return <Navigate to="/login" replace />;
}

try {
  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    Cookies.remove("token");
    return <Navigate to="/login" replace />;
  }

  const isAdmin = decoded.SuperAdmin === "True";
  return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" replace />;
} catch (error) {
  console.error('Error decoding token:', error);
  Cookies.remove("token");
  return <Navigate to="/login" replace />;
}
};

export default AdminRoute;

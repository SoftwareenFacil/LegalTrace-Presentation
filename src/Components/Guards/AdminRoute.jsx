// AdminRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminRoute = () => {
  const isAdmin = Cookies.get('superadmin') === 'true';

  return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default AdminRoute;

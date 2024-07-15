// // PrivateRoute.jsx
// import React from 'react';
// import { Outlet, Navigate} from 'react-router-dom';

// const PrivateRoute = ({ isAuthenticated }) => {
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = () => {
  const token = Cookies.get('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Check if token has expired
    if (decoded.exp * 1000 < Date.now()) {
      Cookies.remove('token');
      return <Navigate to="/login" replace />;
    }

    return <Outlet />;
  } catch (error) {
    console.error('Error decoding token:', error);
    Cookies.remove('token');
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
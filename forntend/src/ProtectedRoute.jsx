// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to home if user does not have permission
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ allowedRole }) {
  const { user } = useAuth();

  // Redirect to login if user is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to their default dashboard if trying to access unauthorized role routes
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard'} replace />;
  }

  return <Outlet />;
}
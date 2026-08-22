import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function ProtectedRoute({ allowedRole }) {
  const auth = useContext(AuthContext);
  const user = auth?.user;

  // 1. If not logged in -> send to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. If logged in but trying to access a role they don't have -> send to THEIR correct dashboard
  if (allowedRole && user.role !== allowedRole) {
    const targetDashboard = user.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard';
    return <Navigate to={targetDashboard} replace />;
  }

  // 3. Allowed -> render page
  return <Outlet />;
}
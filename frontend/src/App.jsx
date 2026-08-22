import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Employee Pages
import EmployeeDashboard from './pages/employee/Dashboard';
import Profile from './pages/employee/Profile';
import Attendance from './pages/employee/Attendance';
import Leave from './pages/employee/Leave';
import Payroll from './pages/employee/Payroll';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Employees from './pages/admin/Employees';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminLeaves from './pages/admin/AdminLeaves';
import AdminPayroll from './pages/admin/AdminPayroll';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Employee Routes */}
          <Route element={<ProtectedRoute allowedRole="employee" />}>
            <Route path="/employee" element={<MainLayout role="employee" />}>
              <Route index element={<Navigate to="/employee/dashboard" replace />} />
              <Route path="dashboard" element={<EmployeeDashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="leave" element={<Leave />} />
              <Route path="payroll" element={<Payroll />} />
            </Route>
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/admin" element={<MainLayout role="admin" />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="employees" element={<Employees />} />
              <Route path="attendance" element={<AdminAttendance />} />
              <Route path="leaves" element={<AdminLeaves />} />
              <Route path="payroll" element={<AdminPayroll />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Store all registered users
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('dayflow_all_users');
    return savedUsers ? JSON.parse(savedUsers) : [
      { id: 'EMP001', name: 'Alex Johnson', email: 'alex.johnson@dayflow.com', password: 'user123', role: 'employee', status: 'Inactive' },
      { id: 'ADM001', name: 'Admin User', email: 'admin@dayflow.com', password: 'admin123', role: 'admin', status: 'Active' }
    ];
  });

  // Store active user session
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dayflow_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Dynamically update user status (Active / Inactive)
  const updateStatus = (newStatus) => {
    if (!user) return;
    const updatedUser = { ...user, status: newStatus };
    setUser(updatedUser);
    localStorage.setItem('dayflow_user', JSON.stringify(updatedUser));

    const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u));
    setUsers(updatedUsers);
    localStorage.setItem('dayflow_all_users', JSON.stringify(updatedUsers));
  };

  // Register a new user
  const register = (name, email, password, role) => {
    const newUser = {
      id: `EMP_${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      password,
      role: role || 'employee', // Default to employee
      status: 'Inactive'
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('dayflow_all_users', JSON.stringify(updatedUsers));

    setUser(newUser);
    localStorage.setItem('dayflow_user', JSON.stringify(newUser));
    return newUser;
  };

  // Login existing user
  const login = (email, password) => {
    // 1. Search registered users array
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('dayflow_user', JSON.stringify(foundUser));
      return foundUser;
    }

    // 2. Strict fallback: ONLY give admin if email explicitly contains 'admin'
    const isExplicitAdmin = email.toLowerCase().includes('admin');
    const dynamicUser = {
      id: isExplicitAdmin ? 'ADM_001' : `EMP_${Math.floor(1000 + Math.random() * 9000)}`,
      name: email.split('@')[0],
      email,
      role: isExplicitAdmin ? 'admin' : 'employee', // Guarantees employee role for standard emails
      status: 'Inactive'
    };

    setUser(dynamicUser);
    localStorage.setItem('dayflow_user', JSON.stringify(dynamicUser));
    return dynamicUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dayflow_user');
  };

  return (
    <AuthContext.Provider value={{ user, users, login, register, logout, updateStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
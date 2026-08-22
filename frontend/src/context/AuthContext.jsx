import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('dayflow_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password, role = 'employee') => {
    const userData = {
      id: 'usr_101',
      name: role === 'admin' ? 'Admin User' : 'Alex Johnson',
      email,
      role, // 'employee' or 'admin'
    };
    setUser(userData);
    localStorage.setItem('dayflow_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dayflow_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
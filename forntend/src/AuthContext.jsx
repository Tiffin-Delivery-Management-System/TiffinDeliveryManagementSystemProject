// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Load user role from sessionStorage on initial load
    const storedRole = sessionStorage.getItem('role');
    if (storedRole) {
      setRole(JSON.parse(storedRole));
    }
  }, []);

  const login = (r) => {
    const role = { r};
    sessionStorage.setItem('role', JSON.stringify(role));
    setRole(role);
  };

  const logout = () => {
    sessionStorage.removeItem('role');
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

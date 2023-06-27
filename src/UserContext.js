import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Perform login logic, e.g., API call
    setUser(userData);
  };

  const register = (userData) => {
    // Perform registration logic, e.g., API call
    setUser(userData);
  };

  const logout = () => {
    // Perform logout logic, e.g., clear user data
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

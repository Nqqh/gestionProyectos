import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Aquí verificaremos si hay un token almacenado y lo validaremos
    const token = localStorage.getItem('token');
    if (token) {
      // En un escenario real, aquí verificarías el token con el backend
      setUser({ name: 'Usuario Autenticado' }); // Por ahora, simplemente fingimos que el usuario está autenticado
    }
  }, []);

  const login = (userData) => {
    // Aquí implementaremos la lógica de inicio de sesión
    setUser(userData);
    localStorage.setItem('token', 'fake-token'); // En un escenario real, esto sería un JWT
  };

  const logout = () => {
    // Lógica de cierre de sesión
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
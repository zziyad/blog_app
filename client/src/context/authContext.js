import React, { createContext, useEffect, useState } from 'react'
import scaffolding from '../system/client';


export const AuthContext = createContext('No Provider');

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const login = async (inputs) => {
    await scaffolding.load('auth');
    const res = await scaffolding.api.auth.signin(inputs);
    if (res.status === 'rejected') return  res;
    setCurrentUser(res.result);
    return res;
  }

  const logout = async (inputs) => {
    document.cookie = '';
    setCurrentUser(null);
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [idTerminal, setIdTerminal] = useState(localStorage.getItem('uniqueId') ? localStorage.getItem('uniqueId').toUpperCase() : '');

  return (
    <GlobalContext.Provider value={{ idTerminal, setIdTerminal }}>
      {children}
    </GlobalContext.Provider>
  );
};
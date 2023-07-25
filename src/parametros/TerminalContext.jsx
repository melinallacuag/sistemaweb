import React, { createContext, useState } from 'react';

export const TerminalContext = createContext();

export const TerminalProvider = ({ children }) => {
  const [terminalID, setTerminalID] = useState('');

  // Resto del código del proveedor...

  return (
    <TerminalContext.Provider value={{ terminalID, setTerminalID }}>
      {children}
    </TerminalContext.Provider>
  );
};
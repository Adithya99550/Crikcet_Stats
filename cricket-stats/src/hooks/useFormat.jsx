import { useState, createContext, useContext } from 'react';

const FormatContext = createContext();

export const FormatProvider = ({ children }) => {
  const [format, setFormat] = useState('test');

  return (
    <FormatContext.Provider value={{ format, setFormat }}>
      {children}
    </FormatContext.Provider>
  );
};

export const useFormat = () => {
  const context = useContext(FormatContext);
  if (!context) {
    throw new Error('useFormat must be used within a FormatProvider');
  }
  return context;
};

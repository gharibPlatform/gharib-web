import React, { createContext, useContext, useState } from "react";

const WidthContext = createContext();

export const WidthProvider = ({ children }) => {
  const [width, setWidth] = useState(0);

  return (
    <WidthContext.Provider value={{ width, setWidth }}>
      {children}
    </WidthContext.Provider>
  );
};

export const useWidth = () => useContext(WidthContext);

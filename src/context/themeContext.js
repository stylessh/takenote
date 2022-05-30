import React, { createContext } from "react";

import { getTheme } from "../utils/theme";

const initial = {
  theme: getTheme() || "light",
  setTheme: () => {},
};

export const ThemeContext = createContext(initial);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(() => getTheme() || "light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

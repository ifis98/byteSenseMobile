import React, {createContext, useContext, useState} from 'react';
import {darkThemeColors, lightThemeColors} from '../styles/colors';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const theme = isDarkMode ? darkThemeColors : lightThemeColors;

  return (
    <ThemeContext.Provider value={{...theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

import { createTheme } from "@mui/material";
import { createContext, useContext } from "react";
import useColorTheme from "./useColorTheme";

//establish the theme context, enable toggling functionality
const ThemeContext = createContext({
  mode: "light",
  toggleColorMode: () => {},
  theme: createTheme(),
});

//wrapper for the theme context around all content
const ThemeContextProvider = ({ children }) => {
  const value = useColorTheme();
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

//name the context 
const useThemeContext = () => {
  return useContext(ThemeContext);
};

export { ThemeContext, ThemeContextProvider, useThemeContext };

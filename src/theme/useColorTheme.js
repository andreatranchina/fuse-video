import { createTheme } from "@mui/material";
import { useState, useMemo } from "react";
import { getDesignTokens } from "./theme";

const useColorTheme = () => {
  //hook to show text 
  const [mode, setMode] = useState("light");
  
  //toggle theme text
  const toggleColorMode = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  
  //switch between modes
  const modifiedTheme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};

export default useColorTheme;

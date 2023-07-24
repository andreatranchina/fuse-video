import { createTheme } from "@mui/material";

const useTypographyTheme = () => {
  const tabsTheme = createTheme({
    typography: {
      fontFamily: 'Bungee Hairline, cursive',
      fontWeightBold:  700
    },
    
  });

  const textFieldTheme = createTheme({
    typography: {
      fontFamily: 'Roboto mono, monospace'
    }
  })
return {
 tabsTheme,
  textFieldTheme
}
 
}

export default useTypographyTheme
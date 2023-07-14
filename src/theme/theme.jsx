import { light, dark } from './colors.js';

//overarching theme
const theme = {
  palette: {
    primary: {
      main: light[500],
    },
    secondary: {
      main: dark[500],
    },
  },
};

//establish the color schemes for dark and light modes
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: light[500],
          },
          divider: light[300],
          background: {
            default: light[500],
            paper: light[700],
            fab: light[700],
            hover: light[700],
          },
          text: {
            primary: light[400],
            secondary: light[200],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: dark[500],
          },
          divider: dark[400],
          background: {
            default: dark[500],
            paper: dark[700],
            fab: dark[400],
            hover: dark[700],
          },
          text: {
            primary: dark[100],
            secondary: dark[200],
          },
        }),
  },
});

export { getDesignTokens };
export default theme;

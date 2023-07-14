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
            boxShadow: '2px 2px 4px rgba(129, 91, 132, 0.6)'
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
            boxShadow: '2px 2px 4px rgb(246, 233, 205, 0.6)'
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

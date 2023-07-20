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
          secondary: {
            main: light[600],
          },
          divider: light[300],
          button: {
            main:light[100],
          },
          background: {
            default: light[500],
            paper: light[700],
            fab: {
              default: light[700],
              upload: light[400],
              hover: light[500]
            },
            login:light[600],
            boxShadow: '2px 2px 4px rgba(129, 91, 132, 0.6)',
          },
          text: {
            primary: light[900],
            secondary: light[200],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: dark[500],
          },
          secondary: {
            main: dark[600],
          },
          divider: dark[400],
          button: {
            main:dark[100],
          },
          background: {
            default: dark[500],
            paper: dark[700],
            fab: {
              default: dark[400],
              hover: dark[700],
              upload:dark[800]
            },
            login: dark[900],
            boxShadow: '2px 2px 4px rgba(246, 233, 205, 0.6)',
          },
          text: {
            primary: dark[50],
            secondary: dark[200],
          },
        }),
  },
});

export { getDesignTokens };
export default theme;

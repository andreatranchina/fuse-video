import React from 'react'
import { useThemeContext } from '../../theme/ThemeContextProvider';
import FormControlLabel from '@mui/material/FormControlLabel'
import NightModeSwitch from './NightModeSwitch'

const SwitchLayout = ()  => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <FormControlLabel
      control={<NightModeSwitch onChange={toggleColorMode} checked={mode === 'dark'} />}
      label={mode}
    />
  );
};

export default SwitchLayout
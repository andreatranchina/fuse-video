import React from 'react'
import PropTypes from 'prop-types';
import { Box, Button, Tab, Tabs, ThemeProvider, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setSettingsTab } from '../../redux/ui/ui.actions';
import EditInfoForm from './EditInfoForm';
import { updateEditStatus } from '../../redux/user/user.actions'
import { toggleModal } from '../../redux/ui/ui.actions'
import { submitFail } from '../../redux/forms/forms.actions';
import useTypographyTheme from '../../theme/useTypographyTheme';
import { useThemeContext } from '../../theme/ThemeContextProvider';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  const { textFieldTheme } = useTypographyTheme();
  
  return (
    <ThemeProvider theme={textFieldTheme}>
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        
      )}
    </div>
    </ThemeProvider>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

const a11yProps = (index) => {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SettingsTabs = () => {
  const { theme } = useThemeContext();

  const dispatch = useDispatch();
  const value = useSelector((state) => state.ui.settingsTabValue)
  const { tabsTheme } = useTypographyTheme();

  const handleChange = (e, newTab) => {
    dispatch(setSettingsTab(newTab))
  }

  // console.log('currently on tab ' + value);

  const handleClose = () => {
    dispatch(toggleModal());
    dispatch(updateEditStatus());
    dispatch(submitFail());
  }

  return (
    <Box sx={{ width: '100%' }}>
    <Box display="flex" justifyContent="flex-end" sx={{p:'3px'}}>
      <Button onClick={handleClose} sx={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', color:'red', border:'2px solid red', '&:hover': { backgroundColor:'red', color:`${theme.palette.background.paper}`} }}>
        <CloseOutlinedIcon sx={{'&hover': { backgroundColor:'red !important'}}}/>
      </Button>
    </Box>
        <ThemeProvider theme={tabsTheme}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} textColor={`${theme.palette.text.primary}`} aria-label="basic tabs example" TabIndicatorProps={{
    style: {
      backgroundColor: "#D97D54"
    }
    
  }} >
              <Tab label="Account"  sx={{ fontWeight: 700 }}{...a11yProps(0)} />
              <Tab label="Profile" sx={{ fontWeight: 700 }}{...a11yProps(1)} />
              <Tab label="Preferences" sx={{ fontWeight: 700 }}{...a11yProps(2)} />
            </Tabs>
          </Box>
        </ThemeProvider>
      <TabPanel value={value} index={0}>
        {value === 0 && <EditInfoForm/>}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Profile: Bio, username, topics, location(city, state if US) homecountry
      </TabPanel>
      <TabPanel value={value} index={2}>
        Preferences: languages, notification settings, make profile private (request a follow)
      </TabPanel>
    </Box>
  )
}

export default SettingsTabs

/**
 * Profile: username, bio, topics, location
 * Account: first name, last name, email, phone number, deactivate
 * Preferences: language, notifications (phone/email), make private
 * 
 */
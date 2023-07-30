import React from 'react'
import PropTypes from 'prop-types';
import { Box, Button, Tab, Tabs, ThemeProvider, Typography, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setSettingsTab } from '../../redux/ui/ui.actions'
import EditAccountForm from './account/EditAccountForm'
import EditProfileForm from './profile/EditProfileForm'
import EditPreferencesForm from './preferences/EditPreferencesForm'
import { updateEditStatus, inputNewInfo } from '../../redux/user/user.actions'
import { toggleModal } from '../../redux/ui/ui.actions'
import { submitAccountFail } from '../../redux/account/account.actions'
import { submitProfileFail } from '../../redux/profile/profile.actions'
import { submitPreferencesFail } from '../../redux/preferences/preferences.actions'
import useTypographyTheme from '../../theme/useTypographyTheme'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import AccountDetails from './account/AccountDetails'
import ProfileDetails from './profile/ProfileDetails'
import PreferencesDetails from './preferences/PreferencesDetails'

  const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  const { textFieldTheme } = useTypographyTheme();
  const isSmallScreen = useMediaQuery('(max-width: 550px)');
  return (
    <ThemeProvider theme={textFieldTheme}>
    <div 
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        
          <Box sx={{ p: 3 }}>
            <Typography sx={{textSize:isSmallScreen ? '2px' : '10px'}}>{children}</Typography>
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
  const isSmallScreen = useMediaQuery('(max-width: 700px)');
  const dispatch = useDispatch();
  const value = useSelector((state) => state.ui.settingsTabValue)
  const { tabsTheme } = useTypographyTheme();
  const isEditing = useSelector((state) => !!state.user.isEditingAccount)
  const isInputtingNewInfo = useSelector((state) => !!state.user.isInputtingNewInfo)

  const handleChange = (e, newTab) => {
    // console.log('Changing tab to:', newTab);
    dispatch(setSettingsTab(newTab))
  }

  // console.log('currently on tab ' + value);

  const handleClose = () => {
    dispatch(toggleModal());
    dispatch(updateEditStatus());
    dispatch(submitAccountFail());
    dispatch(submitProfileFail());
		dispatch(submitPreferencesFail());
    if (isInputtingNewInfo){
      dispatch(inputNewInfo(false)); //turn off
    }
  }

  return (
    //for smaller screens
    isSmallScreen ? (
    <Box sx={{ width: '80%' }} >
      <Box display="flex" justifyContent="center" sx={{p:'3px'}}>
        <Button onClick={handleClose} sx={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', color:'red', border:'2px solid red', '&:hover': { backgroundColor:'red', color:`${theme.palette.background.paper}`} }}>
          <CloseOutlinedIcon sx={{'&hover': { backgroundColor:'red !important'}}}/>
        </Button>
      </Box>
        <ThemeProvider theme={tabsTheme}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={value} onChange={handleChange} textColor={`${theme.palette.text.primary}`} aria-label="basic tabs example" TabIndicatorProps={{
    style: {
      backgroundColor: "#D97D54"
    }
    
  }} >
              <Tab label="Account"  sx={{ fontWeight: 700, WebkitTextStrokeWidth: '1px' }}{...a11yProps(0)} />
              <Tab label="Profile" sx={{ fontWeight: 700, WebkitTextStrokeWidth: '1px' }}{...a11yProps(1)} />
              <Tab label="Preferences" sx={{ fontWeight: 700, WebkitTextStrokeWidth: '1px' }}{...a11yProps(2)} />
            </Tabs>
          </Box>
        </ThemeProvider>
      <TabPanel value={value} index={0}>
        {value === 0 && isEditing && isInputtingNewInfo ? <EditAccountForm/> : <AccountDetails/>}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value === 1 && isEditing && isInputtingNewInfo ? <EditProfileForm/> : <ProfileDetails/>}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {value === 2 && isEditing && isInputtingNewInfo ? <EditPreferencesForm/> : <PreferencesDetails/>}
      </TabPanel>
    </Box>) : (<Box sx={{ width: '100%' }} >
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
              <Tab label="Account"  sx={{ fontWeight: 700, WebkitTextStrokeWidth: '1px' }}{...a11yProps(0)} />
              <Tab label="Profile" sx={{ fontWeight: 700, WebkitTextStrokeWidth: '1px' }}{...a11yProps(1)} />
              <Tab label="Preferences" sx={{ fontWeight: 700, WebkitTextStrokeWidth: '1px' }}{...a11yProps(2)} />
            </Tabs>
          </Box>
        </ThemeProvider>
      <TabPanel value={value} index={0}>
        {value === 0 && isEditing && isInputtingNewInfo ? <EditAccountForm/> : <AccountDetails/>}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value === 1 && isEditing && isInputtingNewInfo ? <EditProfileForm/> : <ProfileDetails/>}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {value === 2 && isEditing && isInputtingNewInfo ? <EditPreferencesForm/> : <PreferencesDetails/>}
      </TabPanel>
    </Box>))}

export default SettingsTabs

/**
 * Profile: username, bio, topics, location
 * Account: first name, last name, email, phone number, deactivate
 * Preferences: language, notifications (phone/email), make private
 * 
 */
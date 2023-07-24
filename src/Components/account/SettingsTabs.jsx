import React from 'react'
import PropTypes from 'prop-types';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setSettingsTab } from '../../redux/ui/ui.actions';
import EditInfoForm from './EditInfoForm';
import { editAccount } from '../../redux/user/user.actions'
import { toggleModal } from '../../redux/ui/ui.actions'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
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
  const dispatch = useDispatch();
  const value = useSelector((state) => state.ui.settingsTabValue)

  const handleChange = (e, newTab) => {
    dispatch(setSettingsTab(newTab))
  }

  // console.log('currently on tab ' + value);

  const handleClose = () => {
    dispatch(toggleModal());
    dispatch(editAccount());
  }

  return (
    <Box sx={{ width: '100%' }}>
    <Button onClick={handleClose}>
         "Close"
        </Button>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {value === 0 && <EditInfoForm/>}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value === 1 && <EditInfoForm/>}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
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
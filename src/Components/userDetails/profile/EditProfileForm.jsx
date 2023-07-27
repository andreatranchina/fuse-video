import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField }  from '@mui/material'
import { editProfileField } from '../../../redux/profile/profile.actions';
import { useThemeContext } from '../../../theme/ThemeContextProvider';
import SaveProfileButton from '../profile/SaveProfileButton';
import { State, City } from 'country-state-city'

// Profile: Bio, username, topics, location(city, state if US) homecountry

const EditProfileForm = () => {

  const { theme } = useThemeContext();

  const inputStyles = { 
    width:'100%',
    '& label': {
      color: theme.palette.text.secondary,
      ' &.Mui-focused': {
        color:'white'
      }
    },
     "& .MuiInputLabel-select": {
      color: "green"
    },
  '& .MuiInputBase-root': {
    color: theme.palette.text.secondary, // Change the input text color
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: theme.palette.text.secondary, // Change the line (border) color when input is not focused
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: `#D97D54`, // Change the line (border) color when input is hovered
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: `#D97D54`, // Change the line (border) color when input is focused
  },
  }

  const selectStyles = {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: '#D97D54'
    },
    "&:hover .MuiOutlinedInput-notchedOutline" : {
      borderColor: '#D97D54'
    },
    "& .MuiInputBase-input.MuiSelect-select.MuiSelect-select": {
      color: theme.palette.text.primary, // Change the text color of the selected input
    },
  };

  const dispatch = useDispatch();
  const { bio, topics, city, currentState, errors, isSuccess } = useSelector((state) => state.profile)
  const country = useSelector((state) => state.user.defaultUser?.country)
  const [cities,setCities] = useState([])
  const [states,setStates] = useState([])

  const handleChange = (fieldName, newValue) => {
    dispatch(editProfileField(fieldName,newValue))
  }

  useEffect(() => {
    if (country) {
      console.log(country);
      const statesData = State.getStatesOfCountry(country);
      console.log(statesData);
      setStates(statesData);
    }
  },[])

  useEffect(() => {
    console.log(currentState)
    setCities('')
    if (country && currentState) {
      const citiesData = City.getCitiesOfState(country, currentState);
      setCities(citiesData);
    }
  }, [country, currentState]);

  return (
    <Box 
    component='form'
    autoComplete='off'
    display={'flex'}
    justifyContent={'center'}>
    <Stack spacing={4} sx={{width:'600px'}}>
    <Stack direction='row' spacing={2} display={'flex'} justifyContent={'space-between'} sx={{w:'100%'}}>
     <TextField
        multiline 
        rows={5}
        label='Bio'
        variant={!errors.bio && isSuccess ? 'filled' : 'standard'}
        value={bio}
        onChange={(e) => handleChange('bio', e.target.value)}
        helperText={errors.bio}
        error={!!errors.bio}
        sx={inputStyles}
        />
        <Stack spacing={2} display={'flex'} justifyContent={'space-evenly'} sx={{w:'100%'}}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel
          sx={{color:theme.palette.text.primary, '&.Mui-focused': {
        color: theme.palette.text.secondary // Change the label color on focus
      }}}>State</InputLabel>
            <Select
              value={currentState}
              label="State"
              onChange={(e) => handleChange('currentState',e.target.value)}
              sx={selectStyles}
              inputProps={{
                MenuProps: {
                    MenuListProps: {
                        sx: {
                            backgroundColor: theme.palette.background.fab.default,
                            color:theme.palette.text.primary
                        }
                      }
                  }
              }}
            >
            {states.map((state, index) => (
              <MenuItem key={index} value={state.isoCode}>
                {state.name}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
      </Box>
      <Box sx={{ minWidth: 120 }} >
        <FormControl fullWidth>
          <InputLabel
          sx={{color:theme.palette.text.primary, '&.Mui-focused': {
        color: theme.palette.text.secondary }}}>City</InputLabel>
            <Select
              value={city}
              label="City"
              onChange={(e) => handleChange('city', e.target.value)}
              sx={selectStyles}
              inputProps={{
                MenuProps: {
                    MenuListProps: {
                        sx: {
                            backgroundColor: theme.palette.background.fab.default,
                            color:theme.palette.text.primary
                        }
                      }
                  }
              }}
            >
            {cities.length === 0 ? ('') : (cities.map((city, index) => (
              <MenuItem key={index} value={city.name}>
                {city.name}
              </MenuItem>
            )))}
            </Select>
          </FormControl>
      </Box>
      </Stack>
      </Stack>
          <Box display={'flex'} justifyContent={'center'} sx={{transform:'translateY(20px)'}}  >
            <SaveProfileButton />
        </Box>
        </Stack>
    </Box>
  )
}

export default EditProfileForm
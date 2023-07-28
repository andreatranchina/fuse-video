import React from 'react'
import { Autocomplete, useMediaQuery }from '@mui/material'
import { Paper, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { editPreferredLanguage } from '../../../redux/preferences/preferences.actions'
import { useThemeContext } from '../../../theme/ThemeContextProvider'

const languagesAvailable = [
		{
			name: 'English',
			shortName:'EN'
		},
		{
			name: 'Spanish',
			shortName:'ES'
		},
		{
			name: 'French',
			shortName:'FR'
		},
		{
			name: 'German',
			shortName:'DE'
		},
		{
			name: 'Japanese',
			shortName:'JA'
		},
		{
			name: 'Italian',
			shortName:'IT'
		},
		{
			name: 'Polish',
			shortName:'PL'
		},
		{
			name: 'Dutch',
			shortName:'NL'
		}
	]
    
const LanguageAutocomplete = () => {
  const { theme } = useThemeContext();

  const inputStyles = { 
  width: '100%',
  '& label': {
    color: theme.palette.text.secondary,
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary, // Change the label color
  },
  '& .MuiInputBase-root': {
    color: theme.palette.text.secondary, // Change the input text color
    borderBottom: `1px solid ${theme.palette.text.secondary}`, // Add border bottom to mimic underline
  },
  '& .MuiInputBase-root:hover': {
    borderBottomColor: theme.palette.text.primary, // Change the underline color when input is hovered
  },
  '& .MuiInputBase-root.Mui-focused': {
    borderBottomColor: `#D97D54`, // Change the underline color when input is focused
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
};

		const dispatch = useDispatch();
		const selectedLanguage = useSelector((state) => state.preferences.language);
		const { errors, isSuccess } = useSelector((state) => state.preferences)
		const handleSelectLanguage = (e,newLanguage) => {
			if (newLanguage?.name !== ''){
        console.log(newLanguage)
				dispatch(editPreferredLanguage(newLanguage?.shortName))
			}
      else {

      }
		}

    const menuStyles = {
      background: theme.palette.background.fab.default, 
      color: theme.palette.text.secondary,
    };

		return (
			<Autocomplete
      		options={languagesAvailable}
          variant={!errors.language && isSuccess ? 'filled' : 'standard'}
					getOptionLabel={(option) => option.name}
          PaperComponent={({ children }) => (
          <Paper sx={menuStyles}>{children}</Paper>
        )}
					value={languagesAvailable.find((language) => language?.shortName === selectedLanguage || null)}
					onChange={handleSelectLanguage}
      		renderInput={(params) => <TextField {...params} variant={!errors.language && isSuccess ? 'filled' : 'standard'} label="Language" helperText={errors.language}
          error={!!errors.language}
          sx={inputStyles}/>}
    		/>
		)
	}
	
	export default LanguageAutocomplete
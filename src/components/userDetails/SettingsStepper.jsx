import React from 'react'
import { Box, Button, Paper, Stepper, StepContent, Step, StepLabel, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updateEditStatus } from '../../redux/user/user.actions'
import { toggleModal } from '../../redux/ui/ui.actions'
import { submitAccountFail } from '../../redux/account/account.actions'
import { submitProfileFail } from '../../redux/profile/profile.actions'
import { submitPreferencesFail } from '../../redux/preferences/preferences.actions'
import MobileEditAccountForm from './account/MobileEditAccountForm'
import MobileEditProfileForm from './profile/MobileEditProfileForm'
import MobileEditPreferencesForm from './preferences/MobileEditPreferencesForm'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'


const SettingsStepper = () => {
	const { theme } = useThemeContext();
	const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

	const handleClose = () => {
    dispatch(toggleModal());
    dispatch(updateEditStatus()); //not eidting
    dispatch(submitAccountFail());
		dispatch(submitProfileFail());
		dispatch(submitPreferencesFail());
  }

	const steps = [
  { label: 'Acount', description: 'Description for Step 1' },
  { label: 'Profile', description: 'Description for Step 2' },
  { label: 'Preferences', description: 'Description for Step 3' },
]; 

  return (
    <Box sx={{ maxWidth: 414 }}>
		<Box display={'flex'} justifyContent={'flex-end'}>
		<Button onClick={handleClose} sx={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', color:'red', border:'2px solid red', '&:hover': { backgroundColor:'red', color:`${theme.palette.background.paper}`} }}>
          <CloseOutlinedIcon sx={{'&hover': { backgroundColor:'red !important'}}}/>
        </Button>
				</Box>
      <Stepper activeStep={activeStep} orientation="vertical" display={'flex'} justifyContent={'center'} >
        {steps.map((step, index) => (
          <Step key={step.label} sx={{
          '& .MuiStepLabel-root .Mui-completed': {
            color: 'secondary.dark', // circle color (COMPLETED)
          },
          '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
            {
              color: 'grey.500', // Just text label (COMPLETED)
            },
          '& .MuiStepLabel-root .Mui-active': {
            color: 'secondary.main', // circle color (ACTIVE)
          },
          '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
            {
              color: 'common.white', // Just text label (ACTIVE)
            },
          '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
            fill: 'black', // circle's number (ACTIVE)
          },
        }}>
            <StepLabel
            
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Box >
                <div>
								{activeStep === 0 && <MobileEditAccountForm />}
                {activeStep === 1 && <MobileEditProfileForm />}
                {activeStep === 2 && <MobileEditPreferencesForm />}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 4, mr: 1, backgroundColor: theme.palette.background.fab.default, '&:hover':{backgroundColor: theme.palette.background.fab.upload} }}
                  >
                    {index === steps.length - 1 ? <Typography variant='subtitle2' sx={{color:theme.palette.text.primary}}>Finish</Typography>: <Typography variant='subtitle2' sx={{color:theme.palette.text.primary}}>Continue</Typography>}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 4, mr: 1, color:theme.palette.text.primary }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3, backgroundColor: theme.palette.background.paper }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1, color:theme.palette.text.secondary }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default SettingsStepper

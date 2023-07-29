import React from 'react'
import Box from '@mui/material/Box'
import BusinessMeetingImage from '../../assets/company-employee-attending-remote-videocall-meeting-with-man-laptop-having-conversation-webcam-talking-manager-online-teleconference-call-internet-telework-communication.webp'

const BusinessMeeting = () => {
  return (
    <Box
     component="img"
        sx={{position: 'absolute', 
         height:'90%', borderRadius:'5% 5% 5% 5%',boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'
        }}
        alt="Company employee attending remote videocall meeting with man laptop having conversation webcam talking manager online teleconference call internet telework communication"
        src={BusinessMeetingImage}
        >
    </Box>
  )
}

export default BusinessMeeting
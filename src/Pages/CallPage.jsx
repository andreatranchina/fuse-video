import React, { useEffect, useMemo } from 'react'
import Box from '@mui/material/Box'
import { WebcamComponent } from "../components/WebcamComponent.jsx"
import { ChatBox } from "../components/ChatComponent"
import { io } from 'socket.io-client'

const socket = io('http://localhost:8080');

function CallPage() {


    return (
        <Box sx={{marginTop:'50px'}}>
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <WebcamComponent socket={socket}/>
            </div>
            <div style={{ flex: 1 }}>
                <ChatBox socket/>
            </div>
        </div>
        </Box>
    );
}

export default CallPage;
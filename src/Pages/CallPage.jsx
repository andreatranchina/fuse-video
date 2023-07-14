import Box from '@mui/material/Box'
import { WebcamComponent } from "../components/WebcamComponent";
import { ChatBox } from "../components/ChatComponent";

function CallPage() {
    return (
        <Box sx={{marginTop:'50px'}}>
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <WebcamComponent />
            </div>
            <div style={{ flex: 1 }}>
                <ChatBox />
            </div>
        </div>
        </Box>
    );
}

export default CallPage;
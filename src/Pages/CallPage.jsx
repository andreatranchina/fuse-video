import { WebcamComponent } from "../Components/WebcamComponent";
import { ChatBox } from "../Components/ChatComponent";

function CallPage() {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <WebcamComponent />
            </div>
            <div style={{ flex: 1 }}>
                <ChatBox />
            </div>
        </div>
    );
}

export default CallPage;
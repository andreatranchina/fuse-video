import React, {useEffect} from 'react'
import { useSelector} from 'react-redux';
import ChatComponent from '../components/ChatComponent';
import * as webRTC from '../utils/webRTC';

const LivestreamPage = ({socket}) => {
    const currentLivestream = useSelector((state) => state.livestreams.currentLivestream);
    const isStreamer = useSelector((state) => state.livestreams.isStreamer);
    const loggedInUser = useSelector((state) => state.user);
    const participants = useSelector((state) => state.livestreams.participants);

    useEffect(() => {
        webRTC.initLivestreamConnection(isStreamer, loggedInUser.fullName, currentLivestream.code)

    }, [])

    const handleLeaveRoom = () => {
        window.location.href = window.location.origin;
    }

  return (
    <div style={{marginTop: "5rem"}}>
        <h1>Livestream title: {currentLivestream.title}</h1>
        <h1>Livestream Id: {currentLivestream.code}</h1>
        <h1>Participants</h1>
        {participants? participants.map((participant) => {
            return <p>{participant.name}</p> 
        }):null}
        <ChatComponent socket={socket} username={loggedInUser.fullName} room={currentLivestream.code}/>
        <button>Toggle Mic</button>
        <button>Toggle Camera</button>
        <button onClick={handleLeaveRoom}>Leave Room</button>
        <button>Toggle Screenshare</button>
    </div>
  )
}

export default LivestreamPage
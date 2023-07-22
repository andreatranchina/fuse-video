import React, {useEffect} from 'react'
import { useSelector} from 'react-redux';
import ChatComponent from '../components/ChatComponent';
import * as webRTC from '../utils/webRTC';

const LivestreamPage = ({socket}) => {
    const currentLivestream = useSelector((state) => state.livestreams.currentLivestream);
    const isStreamer = useSelector((state) => state.livestreams.isStreamer);
    const loggedInUser = useSelector((state) => state.user);

    useEffect(() => {
        webRTC.initLivestreamConnection(isStreamer, loggedInUser.fullName, currentLivestream.code)

    })

  return (
    <div style={{marginTop: "5rem"}}>
        <h1>Livestream title: {currentLivestream.title}</h1>
        <h1>Livestream Id: {currentLivestream.code}</h1>
        <ChatComponent socket={socket} username={loggedInUser.fullName} room={currentLivestream.code}/>
    </div>
  )
}

export default LivestreamPage
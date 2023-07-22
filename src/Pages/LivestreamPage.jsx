import React from 'react'
import { useSelector } from 'react-redux';
import ChatComponent from '../components/ChatComponent';

const LivestreamPage = ({socket}) => {
    const currentLivestream = useSelector((state) => state.livestreams.currentLivestream);
    const loggedInUser = useSelector((state) => state.user);

  return (
    <div style={{marginTop: "5rem"}}>
        <h1>Livestream title: {currentLivestream.title}</h1>
        <h1>Livestream Id: {currentLivestream.code}</h1>
        <ChatComponent socket={socket} username={loggedInUser.fullName} room={currentLivestream.code}/>
    </div>
  )
}

export default LivestreamPage
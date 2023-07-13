import React from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = () => {
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    return (
        <div>
            <Webcam videoConstraints={videoConstraints} />
        </div>
    )
};

export default WebcamComponent;
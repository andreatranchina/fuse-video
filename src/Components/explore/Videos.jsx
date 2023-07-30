import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

const Videos = () => {
    const loggedInUserId = useSelector((state) => state.user.defaultUser?.id);
    const [videos, setVideos] = useState([]);

    useEffect (() => {
        const fetchVideos = async () => {
            try{
                const response = await axios.get("http://localhost:3001/api/recordings");
                console.log(response.data);
                // setDownloadUrl(response.data[1].downloadUrl);
                // setBlobUrl(response.data[1].blobUrl);
                setVideos([...response.data])
    
            }
            catch(error){
                console.log(error);
            }

        }
        fetchVideos();
    }, [])

    if (!videos) {
        return <div style={{marginTop: "6rem"}}>Loading...</div>;
      }
    
    return (
    <div>
    <h1> Recent streams </h1>
    {videos.map((recording, index) => {
        return(
            <div className="video-card">
                <div>Placeholder Title</div>
                <div>Placeholder Creator</div>
                <video className="video-element" controls>
                    <source src={recording.downloadUrl} />
                </video>                
            </div>        
            )
    })}
    {/* <video controls>
        <source src={downloadUrl} />
    </video> */}
    {/* {recordedBlobURL.includes('video') ? (
    <video controls>
      <source src={recordedBlobURL} type="video/webm" />
    </video>
    ) : (
    <audio controls>
      <source src={recordedBlobURL} type="audio/webm" />
    </audio>
    )} */}
    </div>
  )
}

export default Videos
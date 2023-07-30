import React, {useState, useEffect} from 'react'
import axios from 'axios';

const Recordings = () => {
    const [recordings, setRecordings] = useState([]);
    // const [recordedBlobURL, setRecordedBlobURL] = useState(null);
    // const [downloadUrl, setDownloadUrl] = useState();
    // const [blobUrl, setBlobUrl] = useState();

    useEffect (() => {
        const fetchRecordings = async () => {
            try{
                const response = await axios.get("http://localhost:3001/api/recordings");
                console.log(response.data);
                // setDownloadUrl(response.data[1].downloadUrl);
                // setBlobUrl(response.data[1].blobUrl);
                setRecordings([...response.data])
    
            }
            catch(error){
                console.log(error);
            }

        }
        fetchRecordings();
    }, [])

    if (!recordings) {
        return <div style={{marginTop: "6rem"}}>Loading...</div>;
      }
    
    //   if (!downloadUrl) {
    //     return <div style={{marginTop: "6rem"}}>Loading...</div>;
    //   }

  return (
    <div style={{marginTop: "6rem"}}>
        <h1> Recent streams </h1>
        {recordings.map((recording, index) => {
            return(        
                <video controls>
                    <source src={recording.downloadUrl} />
                 </video>)
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

export default Recordings

import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import {v4 as uuidv4 } from "uuid";
import FirebaseStorageService from '../../firebase/FirebaseStorageService';
import { IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TextField } from '@mui/material';
import { createTheme } from '@mui/material';
import { ThemeProvider } from "@emotion/react";

const Videos = () => {
    const newVideoTheme = createTheme({
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                // '& input' : {
                //   color: 'black',
                // },
                '& placeholder': {
                  color: 'black',
                },
                '& .MuiOutlinedInput-root': {
                  // backgroundColor: 'white',
                  '& fieldset': {
                    borderColor: 'var(--teal)',
                    boxShadow: 'rgba(58, 115, 144, 0.2) 0 -25px 18px -14px inset,rgba(49, 126, 138, 0.15) 0 1px 2px,rgba(45, 114, 148, 0.15) 0 2px 4px,rgba(44, 106, 187, 0.15) 0 4px 8px,rgba(44, 137, 187, 0.15) 0 8px 16px,rgba(44, 139, 187, 0.15) 0 16px 32px',
                    margin: '7px auto',
                    border: '3px solid white',
                    },
                  '&:hover fieldset': {
                    borderWidth: '0.15rem',
                    borderColor: 'var(--teal)',
                  },
                },
              },
            },
          },
            MuiInputLabel: {
              styleOverrides: {
              // root: {
                color: "white",
              // },
            },
          },
          MuiFormHelperText: {
            styleOverrides: {
              root: {
                textTransform: 'initial',
                fontSize: '0.7rem',
                color: 'black', 
              },
            },
          },
         },
      });
    

    const loggedInUser = useSelector((state) => state.user.defaultUser);
    const [videos, setVideos] = useState([]);
    const [currentTitle, setCurrentTitle] = useState();

    const [videoUrl, setVideoUrl] = useState("");
    const [uploadProgress, setUploadProgress] = useState(-1); //-1 indicates we have not yet started uploading
    const fileInputRef = useRef();
    const [posted, setPosted] = useState(false);

    useEffect (() => {
        const fetchVideos = async () => {
            try{
                const response = await axios.get("https://video-backend-6mkl.onrender.com/api/recordings");
                console.log(response.data);
                setVideos([...response.data])
    
            }
            catch(error){
                console.log(error);
            }

        }
        fetchVideos();
    }, [posted])

    async function handleFileChanged(event){
        const files = event.target.files;
        const file = files[0];

        if(!file){
            alert("file select failed, please try again");
            return;
        }

        const generatedFileId = uuidv4();

        try{
            const downloadUrl = await FirebaseStorageService.uploadFile(
                file, `videos/${generatedFileId}`, setUploadProgress);

            setVideoUrl(downloadUrl);
        }
        catch(error){
            setUploadProgress(-1);
            fileInputRef.current.value = null;
            alert(error.message);
            throw(error);
        }
    }

    function handleCancelVideoClick() {
        FirebaseStorageService.deleteFile(videoUrl); //delete file from storage bucket before it has been sent to firestore
        fileInputRef.current.value = null;
        setVideoUrl("");
        setUploadProgress(-1);
    }

    const handleClickUpload = () => {
        fileInputRef.current.click();
        console.log("clicked");
    }

    const handlePostVideoClick = async () => {
        if(!currentTitle){
            alert("please enter a title for your video");
            return;
        }
        try{
            const response = await axios.post("https://video-backend-6mkl.onrender.com/api/recordings", {
                blobUrl: "noblob",
                downloadUrl: videoUrl,
                user_id: loggedInUser.id,
                title: currentTitle,
                creator: loggedInUser.userName,
                livestream_id: null,
            });

            console.log(response);
            setUploadProgress(-1);
            setVideoUrl(null);
            setPosted(!posted);
        }
        catch(error){
            console.log(error.message);
        }
    }

    if (!videos) {
        return <div style={{marginTop: "6rem"}}>Loading...</div>;
      }
    
    return (
        <ThemeProvider theme={newVideoTheme}>
    <div>
    <h1 className="header-recent-streams" > Recent streams </h1>     
        <Button onClick={handleClickUpload} id="upload-button">Upload
          <FileUploadIcon sx={{color:'white'}}/>
          <input style={{display: 'none'}} type="file" accept="video/*"
            ref={fileInputRef} onChange={handleFileChanged}
          />
        </Button>
        {
        !videoUrl && uploadProgress > -1 ? (
            <div>
                <label htmlFor="file">Upload Progress:</label>
                <progress id="file" value={uploadProgress} max="100">
                    {uploadProgress}%
                </progress>
                <span>{uploadProgress}%</span>
            </div>
        ) : null
        }
        {
        videoUrl ? (
            <div className="video-card uploading-video-card">
                <TextField label="Title" placeholder="Title"
                id="signup-form-email" sx={{ input: { color: 'var(--teal)' } }} 
                type="text" required value={currentTitle} 
                onChange= {(e) => setCurrentTitle(e.target.value)}> 
                </TextField>
                {/* <div className="video-title">Title</div> */}
                <div className="video-creator">Creator</div>
                <video className="video-element" src={videoUrl} controls></video>
                <div className="confirmation-buttons-container">
                    <IconButton type="button" onClick={handleCancelVideoClick}>
                        <CancelIcon sx={{color: "white", fontSize: "2.5rem"}}/>
                    </IconButton>
                    <IconButton type="button" onClick={handlePostVideoClick}>
                        <CheckCircleIcon sx={{color: "white", fontSize: "2.5rem"}}/>
                    </IconButton>
                </div>
            </div>
        ) : null
        }

    {videos.map((recording, index) => {
        return(
            <div className="video-card">
                <div className="video-title">{recording.title}</div>
                <div className="video-creator">{recording.creator}</div>
                <video className="video-element" controls>
                    <source src={recording.downloadUrl} />
                </video>                
            </div>        
            )
    })}
    </div>
    </ThemeProvider>
  )
}

export default Videos
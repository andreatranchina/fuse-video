import React, {useRef, useState} from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { useSelector, useDispatch } from 'react-redux'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import { useMediaQuery } from '@mui/material'
import {v4 as uuidv4 } from "uuid";
import FirebaseStorageService from "../../firebase/FirebaseStorageService";
import axios from 'axios';
import { editAccountThunk } from '../../redux/user/user.actions';
import { useNavigate } from 'react-router-dom'

const UploadProfilePhoto = ({setUploadedPhoto, uploadedPhoto}) => {

  const { theme } = useThemeContext();
  const isSmallScreen = useMediaQuery('(max-width: 900px)');
  const hiddenFileInputRef = useRef()
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(-1); //-1 indicates we have not yet started uploading

  const loggedInUser = useSelector((state) => state.user.defaultUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const upload = {
    backgroundColor: theme.palette.background.fab.upload, width:'36px', height:'24px', 
    transform: 'translate(45px,34px)'
  }

  const uploadSmall = {
    backgroundColor: theme.palette.background.fab.upload, width:'36px', height:'24px', 
    transform: 'translate(-4px,27px)'
  }

  const handleClick = event => {
    hiddenFileInputRef.current.click();
    console.log("clicked");
  };

  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    if(!fileUploaded){
      alert("file select failed, please try again");
      return;
    }

    const generatedFileId = uuidv4();

    try{
      const downloadUrl = await FirebaseStorageService.uploadFile(
          fileUploaded, `profilePictures/${generatedFileId}`, setUploadProgress);        
      setImageUrl(downloadUrl);

      try{
        const editedAccount = {...loggedInUser, imgUrl: downloadUrl}
  
        await dispatch(editAccountThunk(loggedInUser.id, editedAccount));
        setUploadedPhoto(!uploadedPhoto)
      }
      catch(error){
        console.log(error.message);
      }
    }
    catch(error){
      setUploadProgress(-1);
      hiddenFileInputRef.current.value = null;
      alert(error.message);
      throw(error);
    }

  };


  return (
    <Box onClick={handleClick}>
    {isSmallScreen ? ( <Fab sx={uploadSmall}>
        <IconButton >
          <AddIcon sx={{color:'white'}}/>
          <input style={{display: 'none'}} type="file" accept="image/*"
            ref={hiddenFileInputRef} onChange={handleChange}
          />
        </IconButton>
      </Fab>) : ( <Fab sx={upload}>
        <IconButton >
          <AddIcon sx={{color:'white'}}/>
          <input style={{display: 'none'}} type="file" accept="image/*"
            ref={hiddenFileInputRef} onChange={handleChange}
          />
        </IconButton>
      </Fab>)}
      {
        !imageUrl && uploadProgress > -1 ? (
            <div>
                <label htmlFor="file">Upload Progress:</label>
                <progress id="file" value={uploadProgress} max="100">
                    {uploadProgress}%
                </progress>
                <span>{uploadProgress}%</span>
            </div>
        ) : null
    }
     
    </Box>
  )
}

export default UploadProfilePhoto
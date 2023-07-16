import React, { useState } from 'react'
import axios from 'axios'
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import TranslateSelect from './TranslateSelect'
import NativeTranslateSelect from './NativeTranslateSelect'

const Translation = () => {
  const isMobileScreen = useMediaQuery('(max-width: 900px)');
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleInputChange = (e) => {
    setOriginalText(e.target.value);
  };

  const handleTranslate = async () => {
    try {
      const response = await axios.post('https://api-free.deepl.com/v2/translate', null, {
        params: {
          auth_key: process.env.REACT_APP_DEEPL_API_KEY,
          text: originalText,
          target_lang: 'JA',
        },
      });

      const translated = response.data.translations[0].text;
      setTranslatedText(translated);
    } catch (error) {
      console.error('Translation Error:', error);
      setTranslatedText('');
    }
  };

  return (
   <Box>
      <TextField
        value={originalText}
        onChange={handleInputChange}
        label="Enter Text"
        variant="filled"
      />
      {isMobileScreen ? <NativeTranslateSelect/> : <TranslateSelect/>}
      <Button onClick={handleTranslate}>
        Translate
      </Button>
      <Typography >{translatedText}</Typography>
    </Box>
  );
};

export default Translation;

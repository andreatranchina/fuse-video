import React, {useEffect} from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'
import { useDispatch, useSelector } from 'react-redux'
import { changeMessageLanguageThunk, fetchLanguagePreferencesThunk } from "../../redux/translation/translation.actions"
 
const NativeTranslateSelect = () => {
    const dispatch = useDispatch()
     const messageLanguage = useSelector((state) => state.translation.messageLanguage)

  useEffect(() => {
    dispatch(fetchLanguagePreferencesThunk(2));
    console.log(messageLanguage);
  },[dispatch])

    const changeMessageLanguage = (newLanguage) => {
      return dispatch(changeMessageLanguageThunk(2,newLanguage))
    }

  return (
    <Box>
   <FormControl fullWidth>
  <InputLabel variant="standard" htmlFor="uncontrolled-native">
    Language
  </InputLabel>
  <NativeSelect
    value={messageLanguage} 
    onChange={(e) => changeMessageLanguage(e.target.value)}
  >
    <option value={'EN'}>English</option>
    <option value={'DE'}>German</option>
    <option value={'FR'}>French</option>
    <option value={'ES'}>Spanish</option>
    <option value={'JA'}>Japanese</option>
    <option value={'IT'}>Italian</option>
    <option value={'PL'}>Polish</option>
    <option value={'NL'}>Dutch</option>
  </NativeSelect>
</FormControl>
</Box>
  )
}

export default NativeTranslateSelect
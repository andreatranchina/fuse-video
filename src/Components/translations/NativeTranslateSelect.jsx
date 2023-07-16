import React from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'

const NativeTranslateSelect = () => {
  return (
    <Box>
   <FormControl fullWidth>
  <InputLabel variant="standard" htmlFor="uncontrolled-native">
    Language
  </InputLabel>
  <NativeSelect
    defaultValue={'ES'}
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
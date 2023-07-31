import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

const Topic = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Topics = ({viewUserId}) => {
  const isLoggedIn = useSelector((state) => !!state.user.defaultUser?.id);
  const loggedInUserId = useSelector((state) => state.user.defaultUser?.id)
  const isOwnProfile = loggedInUserId === Number(viewUserId); 
  const [topics,setTopics] = useState([
    { key: 0, label: 'Tennis' },
    { key: 1, label: 'Movies' },
    { key: 2, label: 'Music' },
    { key: 3, label: 'True Crime' },
    { key: 4, label: 'E-sports' },
  ])

  const handleDelete = (topicToDelete) => () => {
    setTopics((topics) => topics.filter((topic) => topic.key !== topicToDelete.key));
  }

  const box = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    p: 0.5,
    m: 0,
  }

  return (
    <Box component='ul' sx={box}>
      {topics.map((topic) => {
        let icon;

        return (
          <Topic key={topic.key}>
          {isLoggedIn && isOwnProfile ? (<Chip
              label={topic.label}
              onDelete={handleDelete(topic)}
            />) : <Chip
              label={topic.label}
            />}
          </Topic>
        )
      })}
    </Box>
  )
}

export default Topics

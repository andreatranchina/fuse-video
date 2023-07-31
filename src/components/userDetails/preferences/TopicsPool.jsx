import React from 'react'
import { flagPreferencesErrors, unflagPreferencesErrors} from '../../../redux/preferences/preferences.actions'
import { useDispatch, useSelector } from 'react-redux'
import { addTopic, deleteTopic } from '../../../redux/preferences/preferences.actions'
const TopicsPool = () => {

  const dispatch = useDispatch();
  const topics = useSelector((state) => state.preferences.topics)

  const hasWhiteSpace = (entry) => {
    const whitespaceRegex = /[ \t\n\r]/;
    return whitespaceRegex.test(entry)
  }

  const handleAddTopic = async(topic) => {
    const numberTopics = topics.length;
    if (numberTopics === 5 ){
      //flag the username field as being empty
      dispatch(flagPreferencesErrors({topics:'No more than 5 topics'}))
      setTimeout(() => {
        dispatch(unflagPreferencesErrors())
      },5000)
    } else if (topic === '' || hasWhiteSpace(topic)) {
      //edit the username 
      dispatch(flagPreferencesErrors({topics:'Chose up to 5 topics'}))
    } else {
    dispatch(addTopic(topic))
    }
  }

  const handleDeleteTopic = async(topic) => {
    dispatch(deleteTopic(topic))
  }

  return (
    <div>TopicsPool</div>
  )
}

export default TopicsPool

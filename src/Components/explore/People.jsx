import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addProfileToViewsThunk } from '../../redux/user/user.actions';

const People = ({ users, setUsers }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user.defaultUser?.id);
  
  const handleFollow = async (userId) => {
    try {
      await axios.post(`http://localhost:3001/api/follows/`, {
        loggedInUserId,
        userId,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isFollowed: true } : user
        )
      );

      console.log('followed user:', userId);
    } catch (error) {
      console.error('error following user:', error.message);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/follows/`, {
        data: {
          loggedInUserId,
          userId,
        },
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isFollowed: false } : user
        )
      );

      console.log('unfollowed user:', userId);
    } catch (error) {
      console.error('error unfollowing user:', error.message);
    }
  };

  const handleViewProfile = (userId) => {
    dispatch(addProfileToViewsThunk(userId,loggedInUserId));
    navigate(`/viewProfiles/${userId}`);
  }

  return (
<div className="people-container">
      <h2>Users</h2>
      <ul className="people-list">
        {users.map((user) => (
          <li key={user.id} className="people-item">
            <span>{user.firstName} {user.lastName} {user.userName}</span>
            {user.isFollowed ? (
              <>
              <button
                className="follow-button unfollow" // Change the class name to "unfollow"
                onClick={() => handleUnfollow(user.id)}
              >
                Unfollow
              </button>
              <button
                onClick={() => handleViewProfile(user.id)}>
                View Profile
              </button>
              </>
            ) : (
              <>
              <button
                className="follow-button follow"
                onClick={() => handleFollow(user.id)}
              >
                Follow
              </button>
              <button
                onClick={() => handleViewProfile(user.id)}>
                View Profile
              </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default People;

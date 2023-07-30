import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const People = ({ users, setUsers }) => {
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

  return (
<div className="people-container">
      <h2>Users</h2>
      <div className="people-list">
        {users.map((user) => (
          <div key={user.id} className="people-item">
            <div className="profile-pic-username-container">
              <img className="profile-pic" alt="profile" src={user.imgUrl}></img>
              <div className="username-span">{user.userName}</div>
            </div>
            {user.isFollowed ? (
              <button
                className="follow-button unfollow" // Change the class name to "unfollow"
                onClick={() => handleUnfollow(user.id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="follow-button follow"
                onClick={() => handleFollow(user.id)}
              >
                Follow
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;

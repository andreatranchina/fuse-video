import React from 'react';
import axios from 'axios';

const People = ({ users, loggedInUserId }) => {
  const handleFollow = async (userId) => {
    try {
      await axios.post(`http://localhost:3001/api/follows/`, {
        loggedInUserId,
        userId,
      });
      console.log('followed user:', userId);
    } catch (error) {
      console.error('error following user:', error.message);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
        await axios.delete(`http://localhost:3001/api/follows/`, {
        loggedInUserId,
        userId,
      });
      console.log('unfollowed user:', userId);
    } catch (error) {
      console.error('error unfollowing user:', error.message);
    }
  };

  return (
    <div>
      <h2>List of Registered Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.firstName} {user.lastName} {user.userName}</span>
            {user.isFollowed ? (
              <button onClick={() => handleUnfollow(user.id)}>Unfollow</button>
            ) : (
              <button onClick={() => handleFollow(user.id)}>Follow</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default People;

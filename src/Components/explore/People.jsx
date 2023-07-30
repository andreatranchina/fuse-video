import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProfileToViewsThunk } from '../../redux/user/user.actions';
import PersonIcon from '@mui/icons-material/Person';

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
    dispatch(addProfileToViewsThunk(userId, loggedInUserId));
    navigate(`/viewProfile/${userId}`);
  };

  return (
    <div className="people-container">
      <h2>Users</h2>
      <div className="people-list">
        {users.map((user) => (
          <div key={user.id} className="people-item">
            {user.imgUrl ? (
              <img
                alt="avatar"
                className="profile-pic"
                src={user.imgUrl}
                style={{
                  width: '40px',
                  height: '38px',
                  marginRight: '20px',
                  borderRadius: '2rem',
                }}
              />
            ) : (
              <PersonIcon
                className="profile-pic"
                sx={{
                  width: '38px',
                  height: '38px',
                  marginRight: '20px',
                }}
              />
            )}
            <div className="username-btn-container">
              <div className="username-span">{user.userName}</div>
              {user.isFollowed ? (
                <>
                  <button
                    className="follow-button unfollow"
                    onClick={() => handleUnfollow(user.id)}
                  >
                    Unfollow
                  </button>
                  <Button
                    component={NavLink}
                    onClick={() => handleViewProfile(user.id)}
                    sx={{ backgroundColor: 'red' }}
                  >
                    View Profile
                  </Button>
                </>
              ) : (
                <>
                  <button
                    className="follow-button follow"
                    onClick={() => handleFollow(user.id)}
                  >
                    Follow
                  </button>
                  <Button
                    component={NavLink}
                    onClick={() => handleViewProfile(user.id)}
                    sx={{ backgroundColor: 'red' }}
                  >
                    View Profile
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;

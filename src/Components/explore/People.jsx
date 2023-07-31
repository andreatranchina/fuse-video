import React, {useEffect} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProfileToViewsThunk } from '../../redux/user/user.actions';
import PersonIcon from '@mui/icons-material/Person';
import { fetchFollowingsThunk } from '../../redux/user/user.actions';

const People = ({ users, setUsers }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user.defaultUser?.id);

  const followingIds = useSelector(state => state.user.followingIds);

  useEffect(() => {
    dispatch(fetchFollowingsThunk(loggedInUserId));
    console.log(followingIds);

  }, [loggedInUserId]);

  const handleFollow = async (userId) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/follows/`, {
        loggedInUserId,
        userId,
      });

      console.log('followed user:', userId);
    } catch (error) {
      console.error('error following user:', error.message);
    }
    dispatch(fetchFollowingsThunk(loggedInUserId));
  };

  const handleUnfollow = async (userId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/follows/`, {
        data: {
          loggedInUserId,
          userId,
        },
      });

      console.log('unfollowed user:', userId);
    } catch (error) {
      console.error('error unfollowing user:', error.message);
    }
    dispatch(fetchFollowingsThunk(loggedInUserId));
  };

  const handleViewProfile = (userId) => {
    dispatch(addProfileToViewsThunk(userId, loggedInUserId));
    loggedInUserId === userId ? navigate(`/profile/${userId}`) : navigate(`/viewProfile/${userId}`);
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
                  width: '55px',
                  height: '50px',
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
              <div className="username-span">{user.id === loggedInUserId ? user.userName + " (you)" : user.userName}</div>
              {/* {user.isFollowed ? ( */}
              {user.id !== loggedInUserId 
                ? (
                  <Button
                    className="follow-button"
                    onClick={followingIds.includes(user.id)? () => handleUnfollow(user.id) : () => handleFollow(user.id)}
                    sx={{color: "var(--prussian-blue)", fontSize: "0.7rem", fontWeight:"700", margin: "5px"}}
                    >
                    {followingIds.includes(user.id)?"Unfollow":"Follow"}
                  </Button>)                
                : null} 
                  <Button
                    component={NavLink}
                    onClick={() => handleViewProfile(user.id)}
                    className="follow-button"
                    sx={{color: "var(--prussian-blue)", fontSize: "0.7rem", fontWeight:"700", margin: "5px"}}
                  >
                    Profile
                  </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;

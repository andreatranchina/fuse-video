import React from 'react';

const People = ({ users }) => {
  return (
    <div>
      <h2>List of Registered Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.firstName} {user.lastName} </span>
            <span>{user.userName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default People;
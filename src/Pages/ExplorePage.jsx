import React, { useEffect, useState } from 'react';
import People from './People';

const ExplorePage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/explore/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('user fetch error: ', error));
    }, []);

    return (
        <div>
            <People users={users} />
        </div>
    );
};

export default ExplorePage;
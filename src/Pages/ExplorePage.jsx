import React, { useEffect, useState } from 'react';
import People from '../components/explore/People';
import axios from 'axios';
import '../styles/explorePage.css';

const ExplorePage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/explore/users')
                setUsers(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchUsers();
    }, []);

    return (
        <div>
            <People users={users} setUsers={setUsers} />
        </div>
    );
};

export default ExplorePage;

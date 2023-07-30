import React, { useEffect, useState } from 'react';
import People from '../components/explore/People';
import axios from 'axios';
import Videos from '../components/explore/Videos';
import '../styles/explorePage.css';
import { useThemeContext } from '../theme/ThemeContextProvider';

const ExplorePage = () => {
    const [users, setUsers] = useState([]);
    const {theme, mode } = useThemeContext();

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
        <div id={mode === 'light' ? 'home-light' : 'home-dark'} className="explore-page-container">
            <div className="people-component-container">
                <People users={users} setUsers={setUsers} />
            </div>
            <div className="videos-component-container">
                <Videos />
            </div>
        </div>

    );
};

export default ExplorePage;

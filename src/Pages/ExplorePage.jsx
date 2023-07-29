import React, { useEffect, useState } from 'react';
import People from '../components/explore/People';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "../styles/explorePage.css"

const ExplorePage = () => {
    const [users, setUsers] = useState([]);
    const loggedInUser = useSelector((state) => state.user.defaultUser);

    useEffect(() => {
        console.log(loggedInUser, "hellllo");
        const fetchUsers = async () => {
            try{
                const response = await axios.get('http://localhost:3001/api/explore/users')
                setUsers(response.data)  
            }
            catch(error) {
                console.log(error)
            }
        }
        fetchUsers();
    }, []);

    return (
        <div style={{marginTop:'5rem'}}>
            <People users={users} setUsers={setUsers} loggedInUserId={loggedInUser.id} />
        </div>
    );
};

export default ExplorePage;

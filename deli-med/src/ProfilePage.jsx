import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function ProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const url = `http://127.0.0.1:5000/users`;

        axios.get(url)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data', error);
            });
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/auth/logout');
            console.log(response.data.message);
            window.location.href = "/"; // navigate to home page
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    return (
        <div>
          <div className="card-container">
    <div className="card">
      
      <h1>Welcome, {localStorage.getItem('name')}!</h1>
      <p>Username: {localStorage.getItem('username')}</p>
      <p>Email: {localStorage.getItem('email')}</p>
      <p>Age: {localStorage.getItem('age')}</p>
      <p>Height: {localStorage.getItem('height')}</p>
    </div>
  </div>
            
           
            
      <button>
        <Link to="/treatment-options" className="NavLink">Health Conditions</Link>
      </button>

      
   




     <button onClick={handleLogout}>Logout</button> 
     {/* <button onClick={handleEditProfile}>Edit Profile</button> */}
     
        </div>
    );
}

export default ProfilePage;
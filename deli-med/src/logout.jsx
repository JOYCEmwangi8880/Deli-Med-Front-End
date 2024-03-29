import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    try {
   
      const response = await axios.post('http://127.0.0.1:5000/auth/logout');

      console.log(response.data.message);
      localStorage.clear();
      window.location.href = "/login"

    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
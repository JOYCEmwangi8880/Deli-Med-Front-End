import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      if (!response.ok) {
        // Handle non-2xx response status (error)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
  
      localStorage.setItem('id', responseData.user_data.id);
      localStorage.setItem('name', responseData.user_data.name);
      localStorage.setItem('age', responseData.user_data.age);
      localStorage.setItem('email', responseData.user_data.email);
      localStorage.setItem('height', responseData.user_data.height);
      localStorage.setItem('username', responseData.user_data.username);
  
      navigate('/ProfilePage');
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <div className="login-container">
      
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;



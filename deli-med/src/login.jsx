import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate(); 

 const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/login', {
        username: username,
        password: password,
      });
    
      
     localStorage.setItem('name', response.data.user_data.name)
     localStorage.setItem('age', response.data.user_data.age)
     localStorage.setItem('email', response.data.user_data.email)
     localStorage.setItem('height', response.data.user_data.height)
     localStorage.setItem('username', response.data.user_data.username)
     

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
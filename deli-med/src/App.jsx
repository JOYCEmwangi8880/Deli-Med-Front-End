import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './login';
import SignUp from './signup';
import UserProfile from './UserProfile';
import NavBar from './Components/NavBar';
import About from './Components/About';
import Services from './Components/Services';
import Contacts from './Components/Contacts';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <h1>👋!Welcome to DELI-MED pharmacy</h1>
          <p className="message">Where healing is close to home! 😊!!!</p>
          <div id='div'>
          <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
            </div>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcone to DELI-MED pharmacy</h1>
      <p className="read-the-docs">Where you get to feel better!!!</p>
    </div>
  );
}

export default App;

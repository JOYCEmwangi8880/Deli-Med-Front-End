// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components
import NavBar from './Components/NavBar';
import About from './Components/About';
import Services from './Components/Services';
import Contacts from './Components/Contacts';

// Import your CSS
import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* Your other components */}
        <h1>👋!Welcome to DELI-MED pharmacy</h1>
        <p className="message">Where healing is close to home! 😊!!!</p>

        {/* Render your NavBar component */}
        <NavBar />

        {/* Define your routes */}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contacts" element={<Contacts />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

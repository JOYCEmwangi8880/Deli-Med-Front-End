import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Logout from './logout';
import ProfilePage from './ProfilePage';
import NavBar from './NavBar';
import About from './About';
import Services from './Services';
import Contacts from './Contacts';
import EditProfile from './EditProfile';
import MedicineSelection  from './MedicineSelection';
import TreatmentOptions from './TreatmentOptions';
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <h1>👋!Welcome to DELI-MED pharmacy</h1>
        <p className="message">Where healing is close to home! 😊!!!</p>

        <NavBar />

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contacts" element={<Contacts />} />

          {/* Add other routes as needed */}

          {/* Route for SignUp */}
          <Route path="/signup" element={<Signup />} />

          {/* Route for Login */}
          <Route path="/login" element={<Login />} />
          
          <Route path="/logout" element={<Logout />} />

          <Route path="/ProfilePage" element={<ProfilePage />} />


                {/* <Route path="/medicine-selection" Component={MedicineSelection} /> */}
                <Route path="/treatment-options" Component={TreatmentOptions} />
                <Route path="/edit-profile" Component={EditProfile} />
                <Route path="/medicine-selection" Component={MedicineSelection} />


        
          {/* Default Route (you can redirect it to home or any other page) */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

// Placeholder component for Home
function Home() {
  return (
<div className="navigation-container">
      <Link to="/signup" className="navigation-link">
        Signup
      </Link>
      <Link to="/login" className="navigation-link">
        Login
      </Link>
      <Link to="/logout" className="navigation-link">
        Logout
      </Link>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

function NavBar() {
  const location = useLocation();
  const [isHovered, setHovered] = useState(null);

  return (
    <nav className='navbar'>
      <div className='container'>
        <ul className='navbar-links'>
          <li
            onMouseEnter={() => setHovered('about')}
            onMouseLeave={() => setHovered(null)}
          >
            <Link to='/about' className={location.pathname === '/about' ? 'active' : ''}>
              About us
            </Link>
            {isHovered === 'about' && (
              <div className="hover-content">
                {/* Content to display when hovering over "About" */}
                <ul>
                  <li>Welcome to our pharmacy full-stack application!</li>
                  <li>User-friendly platform integrating the entire pharmacy experience.</li>
                  <li>Secure account creation and personalized dashboards for users.</li>
                  <li>Intuitive symptom input for convenient access to medical advice.</li>
                  <li>Empowering users with control over their health information.</li>
                  <li>Fostering a proactive approach to healthcare.</li>
                </ul>
              </div>
            )}
          </li>
          <li
            onMouseEnter={() => setHovered('services')}
            onMouseLeave={() => setHovered(null)}
          >
            <Link to='/services' className={location.pathname === '/services' ? 'active' : ''}>
              Services
            </Link>
            {isHovered === 'services' && (
              <div className="hover-content">
                {/* Content to display when hovering over "Services" */}
                <ul>
                  <li>Beyond traditional pharmacy services.</li>
                  <li>Direct ordering of prescribed medications through the system.</li>
                  <li>Comprehensive database ensuring accuracy and reliability.</li>
                  <li>User-friendly interface for easy navigation of medication options.</li>
                  <li>Detailed information on dosage, side effects, and usage guidelines.</li>
                  <li>Empowering users to make informed decisions about their health.</li>
                  <li>Seamless and confident medication ordering experience.</li>
                  <li>Prioritizing health and well-being for a reliable pharmaceutical solution.</li>
                </ul>
              </div>
            )}
          </li>
          <li
            onMouseEnter={() => setHovered('contacts')}
            onMouseLeave={() => setHovered(null)}
          >
            <Link to='/contacts' className={location.pathname === '/contacts' ? 'active' : ''}>
              Contacts
            </Link>
            {isHovered === 'contacts' && (
              <div className="hover-content">
                {/* Content to display when hovering over "Contacts" */}
                <ul>
                  <li>Email: deli-med@gmail.com</li>
                  <li>Twitter: @deli-med@254</li>
                  <li>Instagram: @deli-med@254</li>
                </ul>
              </div>
            )}
          </li>
          {/* Add other links as needed */}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

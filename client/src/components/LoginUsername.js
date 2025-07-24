import React, { useState } from 'react';
import './styles/LoginUsername.css';
import { Link, useNavigate } from 'react-router-dom'; // Remove useLocation
import axios from 'axios';

export default function LoginUsername() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const handleCheckUsername = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${SERVER_URL}/api/checkUsername`, {
        usernameOrEmail,
      });
  
      if (response.status === 200) {
        // Navigate to the password page and pass the email as a URL parameter
        navigate(`/loginpass?email=${usernameOrEmail}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('No user found with the given email or username');
      } else {
        console.error('Error during username check:', error);
      }
    }
  };
  

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back!</h2>
      <p className="login-description">Hi there! Enter your username or email to continue.</p>
      <form className="login-form" onSubmit={handleCheckUsername}>
        {errorMessage && <p className="error-message red-text">{errorMessage}</p>}
        <input
          type="text"
          className="login-input"
          placeholder="Username or Email"
          required
          value={usernameOrEmail}
          onChange={(e) => {
            setUsernameOrEmail(e.target.value);
            // Clear the error message when the user starts typing again
            setErrorMessage('');
          }}
        />
        <button type="submit" className="login-button">
          Next
        </button>
      </form>
      <p className="register-link">Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

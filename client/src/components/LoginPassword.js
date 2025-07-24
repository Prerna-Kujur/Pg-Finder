import React, { useState, useEffect } from 'react';
import './styles/LoginPassword.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default function LoginPassword() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Add success message state
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');

  useEffect(() => {
    if (!email) {
      navigate('/search');
    }
  }, [email, navigate, SERVER_URL]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${SERVER_URL}/api/login`, {
        usernameOrEmail: email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        const decodedToken = jwt_decode(token);
        const { userId } = decodedToken;

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('email', email);
        localStorage.setItem('isLoggedIn', true);

        // Set the success message
        setSuccessMessage('Login successful! Redirecting to the home page...');

        // Use setTimeout to navigate to the home page after a delay
        setTimeout(() => {
          navigate('/'); // Navigate to the home page
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid password');
      } else {
        console.error('Error during login:', error);
      }
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back!</h2>
      <p className="login-description">Hi there, Please enter your password to log in.</p>
      <form className="login-form" onSubmit={handleLogin}>
        {errorMessage && <p className="error-message red-text">{errorMessage}</p>}
        {successMessage && <p className="success-message green-text">{successMessage}</p>}
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="forgot-password">Don't remember your password?</p>
      <p className="forgot-password">Don't worry, you can <Link to="/reset">Reset Password</Link></p>
    </div>
  );
}



// OLD CODE WORKING FINE


// import React, { useState, useEffect } from 'react';
// import './styles/LoginPassword.css';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';


// export default function LoginPassword() {
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation(); // Add useLocation to access URL parameters
//   const email = new URLSearchParams(location.search).get('email'); // Extract email parameter from URL

//   useEffect(() => {
//     // Check if email is null or undefined, and redirect away if it is
//     if (!email) {
//       navigate('/login'); // You can specify a different URL to redirect to if needed
//     }
//   }, [email, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await axios.post('http://localhost:3001/api/login', {
//         usernameOrEmail: email,
//         password,
//       });
  
//       if (response.status === 200) {
//         const { token } = response.data; // Extract the token from the response
  
//         // Decode the token to access the payload
//         const decodedToken = jwt_decode(token);
  
//         // Extract the userId from the decoded token
//         const { userId } = decodedToken;
  
//         // Store the token and userId in local storage
        
//         try{
//           localStorage.setItem('token', token);
//           localStorage.setItem('userId', userId);
//           localStorage.setItem('email', email);
//           localStorage.setItem('isLoggedIn', true);
//         }
//         catch(error){
//           console.log(error);
//         }
//         finally{
//           window.location.reload();
//         }
        
//         // Redirect the user to the profile page upon successful login
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         setErrorMessage('Invalid password');
//       } else {
//         console.error('Error during login:', error);
//       }
//     }
//   };

//   // Render the component only if email exists
//   if (!email) {
//     return null; // Or you can return a message indicating that the email parameter is missing
//   }

//   return (
//     <div className="login-container">
//       <h2 className="login-title">Welcome Back!</h2>
//       <p className="login-description">Hi there, Please enter your password to log in.</p>
//       <form className="login-form" onSubmit={handleLogin}>
//         {errorMessage && <p className="error-message red-text">{errorMessage}</p>}
//         <input
//           type="password"
//           className="login-input"
//           placeholder="Password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit" className="login-button">Login</button>
//       </form>
//       <p className="forgot-password">Don't remember your password?</p>
//       <p className="forgot-password">Don't worry, you can <Link to="/reset">Reset Password</Link></p>
//     </div>
//   );
// }

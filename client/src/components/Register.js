  import React, { useState, useRef } from "react";
  import "./styles/Register.css";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";


  export default function Register() {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const [errorMessage, setErrorMessage] = useState('');



    const navigate = useNavigate();


    const [userData, setUserData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      gender: "",
    });

    const [profileImage, setProfileImage] = useState(null);
    const [error] = useState(""); // New error state
    const fileInputRef = useRef(null);

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserData({ ...userData, [name]: value });
    };

    const handleImageChange = (event) => {
      const imageFile = event.target.files[0];
      setProfileImage(imageFile);
    };

    const handleImageIconClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append("profileImage", profileImage);
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("confirmPassword", userData.confirmPassword);
      formData.append("dateOfBirth", userData.dateOfBirth);
      formData.append("gender", userData.gender);

      try {
        const response = await axios.post(`${SERVER_URL}/api/register`, formData);

        // const { message, token } = response.data; // Uncomment if you want to use token
        const { message } = response.data; // removed token from upper line to get rid of error


        setSuccessMessage('Registration successful! Redirecting to the login page...');
        console.log(message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        // Handle registration error
        if (error.response) {
          setErrorMessage(error.response.data.message); // Set the error message
        } else {
          setErrorMessage("An error occurred during registration.");
        }

      }
    };

    return (
      <div className="registration-container">
        <h2 className="registration-title">Create an Account</h2>
        <form className="registration-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
          <div className="profile-image-container">
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="ProfileImage"
                className="profile-image"
                onClick={handleImageIconClick}
              />
            ) : (
              <label htmlFor="profileImage" className="profile-image-label">
                <img
                  src="https://static.thenounproject.com/png/3548602-200.png"
                  alt="ProfileImage"
                  className="profile-image"
                />
              </label>
            )}
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="profile-image-input"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          {/* Rest of the form inputs */}
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            className="registration-input"
            placeholder="First Name"
            required
          />

          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            className="registration-input"
            placeholder="Last Name"
            required
          />

          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="registration-input"
            placeholder="Email Address"
            required
          />

          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            className="registration-input"
            placeholder="Password"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleInputChange}
            className="registration-input"
            placeholder="Confirm Password"
            required
          />

          <input
            type="date"
            name="dateOfBirth"
            value={userData.dateOfBirth}
            onChange={handleInputChange}
            className="registration-input"
            placeholder="Date of Birth"
            required
          />

          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={userData.gender}
            onChange={handleInputChange}
            className="registration-input"
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit" className="registration-button">
            Register
          </button>

        </form>
        {errorMessage && <p className="error-message red-text">{errorMessage}</p>}
        {successMessage && <p className="success-message green-text">{successMessage}</p>}
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    );
  }

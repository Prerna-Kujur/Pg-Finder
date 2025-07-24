import React, { useEffect, useState, useRef, useCallback } from "react";
import "./styles/Profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import isLoggedIn from "../utils/authUtils";

export default function Profile() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    addressLine1: "",
    addressLine2: "",
    area: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    accountStatus: "",
    verificationStatus: "",
    aadhaarNumber: "",
    mobileNumber: "",
    createdAt: "",
    updatedAt: "",
    profilePictureLink: "",
  });

  const [modifiedData, setModifiedData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const profilePictureLink =
    "https://static.thenounproject.com/png/3548602-200.png";

  const fetchProfile = useCallback(async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${SERVER_URL}/api/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setUserData(data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [SERVER_URL]);

  const updateProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const updatedData = { ...userData, ...modifiedData };

      const formData = new FormData();
      formData.append("profileImage", profileImage);
      for (const key in updatedData) {
        formData.append(key, updatedData[key]);
      }

      const response = await axios.put(
        `${SERVER_URL}/api/profile/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("User profile updated successfully");
      } else {
        console.error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  }, [userData, modifiedData, profileImage, SERVER_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setModifiedData((prevModifiedData) => ({
      ...prevModifiedData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setProfileImage(imageFile);
    setIsImageSelected(true);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      updateProfile();
    }
  };

  const handleUpdateButtonClick = () => {
    updateProfile();
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const isLogin = localStorage.getItem("isLoggedIn");

    if (userId && isLogin && isLoggedIn()) {
      fetchProfile(userId);
    } else {
      navigate("/");
    }
  }, [SERVER_URL, fetchProfile, navigate]);

  useEffect(() => {
    if (isImageSelected) {
      updateProfile();
    }
  }, [isImageSelected, updateProfile]);

  useEffect(() => {
    console.log("userData changed:", userData);
    console.log("modifiedData changed:", modifiedData);
  }, [userData, modifiedData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");

    window.location.reload();
  };



  return (
    <div className="profile-container">
      <div className="profile-top">
        <h2 className="profile-header">Profile</h2>
        <br />
        <br />
      </div>

      <div className="profile-image-container">
        <label htmlFor="profileImage" className="profile-image-label">
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="ProfileImage"
              className="profile-image"
            />
          ) : (
            <img
              src={
                userData.profilePictureLink
                  ? `${SERVER_URL}${userData.profilePictureLink}`
                  : profilePictureLink
              }
              alt="ProfileImage"
              className="profile-image"
            />
          )}
        </label>
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

      <div className="profile-details">
        <div className="section-header">Basic Details</div>
        <div className="profile-field">
          <div className="field-label">First Name:</div>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              className="field-value"
              defaultValue={userData.firstName}
              onChange={handleInputChange} // Add this to handle input changes
              onBlur={toggleEditing}
            />
          ) : (
            <div className="field-value" onClick={toggleEditing}>
              {userData.firstName}
            </div>
          )}
        </div>
        <div className="profile-field">
          <div className="field-label">Last Name:</div>
          {isEditing ? (
            <input
              type="text"
              name="lastName" // Set the name attribute to match the state property
              className="field-value"
              defaultValue={userData.lastName}
              onChange={handleInputChange} // Add this to handle input changes
              onBlur={toggleEditing}
            />
          ) : (
            <div className="field-value" onClick={toggleEditing}>
              {userData.lastName}
            </div>
          )}
        </div>
        <div className="profile-field">
          <div className="field-label">Email:</div>
          {isEditing ? (
            <input
              type="text"
              name="email" // Set the name attribute to match the state property
              className="field-value"
              defaultValue={userData.email}
              onChange={handleInputChange} // Add this to handle input changes
              onBlur={toggleEditing}
            />
          ) : (
            <div className="field-value" onClick={toggleEditing}>
              {userData.email}
            </div>
          )}
        </div>
        <div className="profile-field">
          <div className="field-label">Gender:</div>
          {isEditing ? (
            <select
              name="gender" // Set the name attribute to match the state property
              className="field-value"
              defaultValue={userData.gender}
              onChange={handleInputChange} // Add this to handle input changes
              onBlur={toggleEditing}
            >
              <option defaultValue="Male">Male</option>
              <option defaultValue="Female">Female</option>
              <option defaultValue="Other">Other</option>
            </select>
          ) : (
            <div className="field-value" onClick={toggleEditing}>
              {userData.gender}
            </div>
          )}
        </div>
        <div className="profile-field">
          <div className="field-label">Date of Birth:</div>
          <input
            className="field-value"
            onClick={toggleEditing}
            defaultValue={userData.dateOfBirth}
          />
        </div>
      </div>

      <div className="profile-details">
        <div className="section-header">Address Details</div>
        <div className="profile-field">
          <div className="field-label">Address Line 1:</div>
          {isEditing ? (
            <input
              type="text"
              name="addressLine1" // Set the name attribute to match the state property
              className="field-value"
              defaultValue={userData.addressLine1}
              onChange={handleInputChange} // Add this to handle input changes
              onBlur={toggleEditing}
            />
          ) : (
            <div className="field-value" onClick={toggleEditing}>
              {userData.addressLine1}
            </div>
          )}
        </div>
        <div className="profile-field">
          <div className="field-label">Address Line 2:</div>
          {isEditing ? (
            <input
              type="text"
              name="addressLine2" // Set the name attribute to match the state property
              className="field-value"
              defaultValue={userData.addressLine2}
              onChange={handleInputChange} // Add this to handle input changes
              onBlur={toggleEditing}
            />
          ) : (
            <div className="field-value" onClick={toggleEditing}>
              {userData.addressLine2}
            </div>
          )}
        </div>

        <div className="profile-field">
          <div className="field-label">Area:</div>
          {isEditing ? (
            <input
              type="text"
              name="area" // Set the name attribute to match the state property
              className="field-value"
              defaultValue={userData.area}
              onChange={handleInputChange} // Add this to handle input changes
              onBlur={toggleEditing}
            />
          ) : (
            <div className="field-value" onClick={toggleEditing}>
              {userData.area}
            </div>
          )}
        </div>

        <div className="profile-field">
          <div className="field-label">City:</div>
          {isEditing ? (
            <input
              type="text"
              name="city" // Set the name attribute to match the state property
              className="field-value"
              defaultValue={userData.city}
              onChange={handleInputChange} // Add this to handle input changes
              onBlur={toggleEditing}
            />
          ) : (
            <div className="field-value" onClick={toggleEditing}>
              {userData.city}
            </div>
          )}
        </div>
        <div className="profile-field">
          <div className="field-label">State:</div>
          {isEditing ? (
            <input
              type="text"
              name="state" // Set the name attribute to match the state property
              className="field-value"
              defaultValue={userData.state}
              onChange={handleInputChange} // Add this to handle input changes
              onBlur={toggleEditing}
            />
          ) : (
            <div className="field-value" onClick={toggleEditing}>
              {userData.state}
            </div>
          )}
        </div>

        <div className="profile-field">
          <div className="field-label">Country:</div>
          {isEditing ? (
            <input
              type="text"
              name="country" // Set the name attribute to match the state property
              className="field-value"
              defaultValue={userData.country}
              onChange={handleInputChange} // Add this to handle input changes
              onBlur={toggleEditing}
            />
          ) : (
            <div className="field-value" onClick={toggleEditing}>
              {userData.country}
            </div>
          )}
        </div>
        <div className="profile-field">
          <div className="field-label">Pincode:</div>
          {isEditing ? (
            <input
              type="text"
              name="pincode" // Set the name attribute to match the state property
              className="field-value"
              defaultValue={userData.pincode}
              onChange={handleInputChange} // Add this to handle input changes
              onBlur={toggleEditing}
            />
          ) : (
            <div className="field-value" onClick={toggleEditing}>
              {userData.pincode}
            </div>
          )}
        </div>
      </div>
      <div className="profile-details">
        <div className="section-header">KYC Details</div>
        <div className="profile-field">
          <div className="field-label">Account Status:</div>
          <input
            type="text"
            className="field-value"
            defaultValue={userData.accountStatus}
          />
        </div>
        <div className="profile-field">
          <div className="field-label">Verification Status:</div>
          <input
            type="text"
            className="field-value"
            defaultValue={userData.verificationStatus}
          />
        </div>
        <div className="profile-field">
          <div className="field-label">Aadhaar Number:</div>
          {isEditing ? (
            <input
              type="Number"
              name="aadhaarNumber" // Set the name attribute to match the state property
              className="field-value"
              defaultValue={userData.aadhaarNumber}
              onChange={handleInputChange} // Add this to handle input changes
              onBlur={toggleEditing}
            />
          ) : (
            <div className="field-value" onClick={toggleEditing}>
              {userData.aadhaarNumber}
            </div>
          )}
        </div>

        <div className="profile-field">
          <div className="field-label">Mobile Number:</div>
          {isEditing ? (
            <input
              type="Number"
              name="mobileNumber" // Set the name attribute to match the state property
              className="field-value"
              defaultValue={userData.mobileNumber}
              onChange={handleInputChange} // Add this to handle input changes
              onBlur={toggleEditing}
            />
          ) : (
            <div className="field-value" onClick={toggleEditing}>
              {userData.mobileNumber}
            </div>
          )}
        </div>
      </div>

      <div className="profile-details">
        <div className="section-header">Account Details</div>

        <div className="profile-field">
          <div className="field-label">Created At:</div>
          <div className="field-value">{userData.createdAt}</div>
        </div>
        <div className="profile-field">
          <div className="field-label">Updated At:</div>
          <div className="field-value">{userData.updatedAt}</div>
        </div>
      </div>
      <div className="logout-button">
        <button onClick={handleUpdateButtonClick}>Update</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

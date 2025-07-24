import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "./styles/ScheduleVisit.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function ScheduleVisit() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const roomId = searchParams.get('roomId');
  const ownerId = searchParams.get('owner'); // Get ownerId from URL
  const roomName = name ? decodeURIComponent(name) : "";

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    additionalNotes: "",
    ownerId: ownerId, // Include ownerId in the initial form data
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("userId");
      const formDataWithIds = {
        ...formData,
        roomId: roomId,
        userId: userId,
        roomName: roomName,
      };

      const response = await axios.post(
        `${SERVER_URL}/api/schedule`,
        formDataWithIds
      );

      console.log("Form data submitted:", response.data);
      navigate("/appointments");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      // Redirect to the login page or display an error message
      navigate("/login"); // Adjust the route to your login page
    }
  }, [navigate,SERVER_URL]);

  return (
    <div className="schedule-visit-container">
      <h2>
        Schedule Offline Visit to {roomName}
      </h2>
      <br />
      <h4>Please Enter Your Details:</h4>
      <form onSubmit={handleSubmit}>
        <br />
        <div className="form-group-name">
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Additional Notes:</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="schedule-visit-btn-container">
          <button className="schedule-visit-btn" type="submit">
            Schedule Visit
          </button>
        </div>
      </form>
    </div>
  );
}

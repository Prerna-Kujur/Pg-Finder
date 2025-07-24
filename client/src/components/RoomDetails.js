import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/RoomDetails.css";

function RoomDetails() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [roomData, setRoomData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const roomId = new URLSearchParams(location.search).get("id");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/getroom/${roomId}`)
      .then((response) => {
        const data = response.data;
        if (data) {
          setRoomData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  }, [roomId,SERVER_URL]);

  if (!roomData) {
    return <div className="loading-container">Loading...</div>;
  }

  const iconToFeature = {
    "fa-wifi": "Wi-Fi",
    "fa-parking": "Parking",
    "fa-bed": "Bed",
    "fa-snowflake": "Air Conditioning",
    "fa-fire": "Heating",
    "fa-bath": "Private Bathroom",
    "fa-sun": "Balcony/Terrace",
    "fa-paw": "Pet-Friendly",
    "fa-smoking-ban": "Non-Smoking",
    "fa-wheelchair": "Wheelchair Accessible",
  };

  const {
    roomName,
    ownerFirstName,
    ownerLastName,
    ownerId,
    addressLine1,
    addressLine2,
    area,
    city,
    state,
    country,
    pincode,
    price,
    thumbnailImage,
    nearbyFacilities,
    description,
    capacity,
    photos,
    features,
    amenities,
    availability,
    rating,
    peopleRated,
  } = roomData;

  const thumbnailImageUrl = `${SERVER_URL}${thumbnailImage}`;
  const photoUrls = photos.map((photo) => `${SERVER_URL}${photo}`);
  console.log(thumbnailImageUrl);
  console.log(photoUrls);

  const handleSchedule = () => {
    // Navigate to the room details page with the room ID
    navigate(`/schedule?roomId=${roomId}&name=${roomName}&owner=${ownerId}`);
  };
  const isOwner = ownerId === userId;
  const isAvailable = availability === "true";

  const handleDeleteRoom = () => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      // You can send a DELETE request to your server here
      axios
        .delete(`${SERVER_URL}/api/deleteroom/${roomId}`)
        .then((response) => {
          
          alert("Room deleted successfully!");
          
          navigate('/rooms'); 
        })
        .catch((error) => {
          // Handle errors (e.g., show an error message)
          console.error("Error deleting room:", error);
          alert("Failed to delete room. Please try again later.");
        });
    }
  };
    

  return (
    <div className="container">
      <h2 className="room-details-heading">Room Details</h2>

      <div className="room-details">
        <div className="center-content">
          <div className="center-header-image">
            <img
              src={thumbnailImageUrl}
              alt="Thumbnail RoomPhoto"
              className="header-image"
            />
          </div>
          <br />
          <br />
          <div className="room-info">
            <div className="room-name">{roomName}</div>
            <div className="owner-style">
              Owner: {ownerFirstName} {ownerLastName}
            </div>
            <div className="availability-style">
              Availability:{" "}
              {availability === "true" ? "Available" : "Not Available"}
            </div>

            <div className="rating-style">
              Rating: {peopleRated > 0 ? rating : "Not rated yet"}
            </div>
            <div className="people-rated-style">
              (Rated by {peopleRated} people)
            </div>
            {/* Conditionally render the buttons based on ownership */}
            {isOwner ? (
              <button className="delete-room-button" onClick={handleDeleteRoom}>
                Delete Room
              </button>
            ) : isAvailable ? (
              <div>
                <button className="book-now-button">Book Now</button>
                <button className="shedule-now-button" onClick={handleSchedule}>
                  Schedule an offline visit
                </button>
              </div>
            ) : null}
          </div>

          <div className="left-content">
            <div className="room-description-style">
              <div className="description-title-style">Address:</div>
              <div className="details-text">
                {addressLine1}, {addressLine2}, {area},
              </div>
              <div className="details-text">
                {city}, {state}, {country} - {pincode}
              </div>
            </div>
            <br />
            <div className="details-style">
              <strong className="details-title">Price:</strong> Rs.
              <strong>{price}</strong> per month
            </div>
            <div className="details-style">
              <strong className="details-title">Capacity:</strong> {capacity}
            </div>
            <div className="features-amenities-style">
              <strong className="details-title">Features:</strong>{" "}
              {features.split(",").map((icon, index) => {
                const featureName = iconToFeature[icon];
                return featureName ? (
                  <span key={index}>{featureName}, </span>
                ) : // Handle the case where the icon is not found
                null;
              })}
            </div>
            <div className="features-amenities-style">
              <strong className="details-title">Amenities:</strong> {amenities}
            </div>
            <div className="features-amenities-style">
              <strong className="details-title">Nearby Facilities:</strong>{" "}
              {nearbyFacilities}
            </div>
            <div className="room-description-style">
              <div className="description-title-style">Description:</div>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="photos-style">
        <h2 className="photos-heading-text">Photos</h2>
        <div className="photo-list">
          {photoUrls.map((photoUrl, index) => (
            <div className="photo-style" key={index}>
              <img src={photoUrl} alt={`RoomPhoto ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;

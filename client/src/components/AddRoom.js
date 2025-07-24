import axios from "axios";
import React, { useState, useEffect } from "react";
import "./styles/AddRoom.css";
import { useNavigate } from "react-router-dom";

export default function AddRoom() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const initialRoomData = {
    roomName: "",
    capacity: "",
    price: "",
    features: "",
    amenities: "",
    nearbyFacilities: "",
    description: "",
    availability: true,
    ownerFirstName: "",
    ownerLastName: "",
    addressLine1: "",
    addressLine2: "",
    area: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    ownerId: "",
    thumbnailImage: "",
    photos: [],
  };

  const [roomData, setRoomData] = useState({
    ...initialRoomData,
    ownerId: localStorage.getItem("userId"), // Set ownerId from localStorage
  });

  useEffect(() => {

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      // Redirect to the login page or handle the situation accordingly
      navigate("/login"); // Adjust the route to your login page
    }
  }, [navigate,SERVER_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData({
      ...roomData,
      [name]: value,
    });
  };

  // const handleAvailabilityChange = (e) => {
  //   const { name, checked } = e.target;
  //   setRoomData({
  //     ...roomData,
  //     [name]: checked,
  //   });
  // };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true); // Start loading
  
    try {
      const formData = new FormData();
  
      // Append all room data properties to the formData
      for (const key in roomData) {
        if (roomData.hasOwnProperty(key)) {
          if (key === "photos") {
            // Append each photo to the formData
            for (let i = 0; i < roomData.photos.length; i++) {
              formData.append("photos", roomData.photos[i]);
            }
          } else if (key === "features") {
            // Convert the selected features array to a comma-separated string
            const featuresString = selectedFeatures.join(',');
            formData.append('features', featuresString);
          } else {
            formData.append(key, roomData[key]);
          }
        }
      }
  
      // Send the formData to your server using Axios
      const result = await axios.post(`${SERVER_URL}/api/createroom`, formData);
  
      if (result) {
        // Reset the form only after successful submission
        setRoomData(initialRoomData);
        setSelectedFeatures([]);
        setIsLoading(false); // Stop loading
        await navigate('/rooms');
      }
    } catch (error) {
      setIsLoading(false); // Stop loading
  
      // Handle the error here
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server");
      } else {
        console.error("An error occurred:", error.message);
      }
    }
  };
  
  
  

  const handleThumbnailUpload = (e) => {
    const { name, files } = e.target;

    if (name === "thumbnailImage" && files.length > 0) {
      // Get the first selected file (assuming you only want one thumbnail)
      const thumbnailImage = files[0];
      setRoomData({
        ...roomData,
        thumbnailImage: thumbnailImage,
      });
    }
  };

  const handlePhotosUpload = (e) => {
    const { name, files } = e.target;

    if (name === "photos") {
      // Update the photos array with the selected files
      const selectedPhotos = Array.from(files); // Convert FileList to an array
      setRoomData({
        ...roomData,
        photos: selectedPhotos,
      });
    }
  };

  const availableFeatures = [
    { name: "Wi-Fi", icon: "fa-wifi" },
    { name: "Parking", icon: "fa-parking" },
    { name: "Bed", icon: "fa-bed" },
    { name: "Air Conditioning", icon: "fa-snowflake" },
    { name: "Heating", icon: "fa-fire" },
    { name: "Private Bathroom", icon: "fa-bath" },
    { name: "Balcony/Terrace", icon: "fa-sun" },
    { name: "Pet-Friendly", icon: "fa-paw" },
    { name: "Non-Smoking", icon: "fa-smoking-ban" },
    { name: "Wheelchair Accessible", icon: "fa-wheelchair" },
  ];

  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleFeatureChange = (featureName) => {
    if (selectedFeatures.includes(featureName)) {
      setSelectedFeatures(
        selectedFeatures.filter((feature) => feature !== featureName)
      );
    } else {
      setSelectedFeatures([...selectedFeatures, featureName]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-room-container">
      <h2 className="add-room-header">Add a Room</h2>
      <div className="add-room-form">
        <div className="form-section">
          <h3>Room Details</h3>
          <input
            type="text"
            name="roomName"
            placeholder="Room Name"
            className="form-input"
            value={roomData.roomName}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            className="form-input"
            value={roomData.capacity}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="form-input"
            value={roomData.price}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="amenities"
            placeholder="Amenities (comma-separated)"
            className="form-input"
            value={roomData.amenities}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="nearbyFacilities"
            placeholder="Nearby Facilities (comma-separated)"
            className="form-input"
            value={roomData.nearbyFacilities}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="form-input"
            value={roomData.description}
            onChange={handleInputChange}
            required
            
          ></textarea>
          {/* <label className="availability-checkbox">
            <input
              type="checkbox"
              name="availability"
              checked={roomData.availability}
              onChange={handleAvailabilityChange}
              required
            />
            Is Available
          </label> */}

          <br />
          <br />

          {availableFeatures.map((feature) => (
            <label key={feature.name} className="features-checkbox">
              <input
                type="checkbox"
                name={`feature_${feature.name}`}
                checked={selectedFeatures.includes(feature.icon)}
                onChange={() => handleFeatureChange(feature.icon)}  
              />
              <span className="feature-icon">&#10004;</span>
              {feature.name}
            </label>
          ))}

          {/* Add more room details inputs here */}
        </div>
        <div className="form-section">
          <h3>Owner Details</h3>
          <input
            type="text"
            name="ownerFirstName"
            placeholder="First Name"
            className="form-input"
            value={roomData.ownerFirstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="ownerLastName"
            placeholder="Last Name"
            className="form-input"
            value={roomData.ownerLastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-section">
          <h3>Address Details</h3>
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1"
            className="form-input"
            value={roomData.addressLine1}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2"
            className="form-input"
            value={roomData.addressLine2}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="area"
            placeholder="Area"
            className="form-input"
            value={roomData.area}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="form-input"
            value={roomData.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            className="form-input"
            value={roomData.state}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="form-input"
            value={roomData.country}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            className="form-input"
            value={roomData.pincode}
            onChange={handleInputChange}
            required
          />
          
        </div>
        <div className="form-section">
        <h3>Thumbnail and Photos</h3>
        <input
            type="file"
            name="thumbnailImage"
            accept="image/*"
            onChange={handleThumbnailUpload}
            required
          />
          <input
            type="file"
            name="photos"
            accept="image/*"
            multiple // Allow multiple file selection
            onChange={handlePhotosUpload}
            required
          />
        </div>
      </div>
      <button className="add-room-button" type="submit" disabled={isLoading}>
  {isLoading ? 'Adding Room...' : 'Add Room'}
</button>
    </form>
  );
}
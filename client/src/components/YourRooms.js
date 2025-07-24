import React, { useState, useEffect } from "react";
import RoomCard from "./RoomCard";
import "./styles/YourRooms.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function YourRooms(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const userId = localStorage.getItem("userId"); // Get the userId from localStorage
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      // Redirect to the login page or handle the situation accordingly
      navigate("/login"); // Adjust the route to your login page
      return; // Prevent further execution of the component
    }

    // Fetch room data from your Express server when the component mounts
    axios
      .get(`${SERVER_URL}/api/getrooms`)
      .then((response) => {
        const userRooms = response.data.filter(
          (room) => room.ownerId === userId
        );
        setRooms(userRooms);
        setFilteredRooms(userRooms);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  }, [userId, navigate, SERVER_URL]); // Include userId and navigate in the dependency array

  useEffect(() => {
    let filtered = rooms.filter((room) => {
      return true; // Add your filtering logic here
    });

    // Sort the filteredRooms array based on the sortingOrder
    const sortedFilteredRooms = [...filtered];
    if (props.sortingOrder === "asc") {
      sortedFilteredRooms.sort((a, b) => a.price - b.price); // Sort in ascending order
    } else {
      sortedFilteredRooms.sort((a, b) => b.price - a.price); // Sort in descending order
    }

    setFilteredRooms(sortedFilteredRooms);
  }, [
    rooms,
    props.selectedPriceRange,
    props.selectedFeatures,
    props.searchText,
    props.searchAddress,
    props.searchOwnerName,
    props.sortingOrder,
    SERVER_URL
  ]);

  return (
    <div className="your-rooms-main-container">
      <div className="your-rooms-container">
        <h2 className="your-rooms-header">Your Rooms</h2>
        {filteredRooms.length === 0 ? (
          <p className="text-centered">You have not added any rooms!</p>
        ) : (
          filteredRooms.map((room, index) => (
            <RoomCard key={index} {...room} />
          ))
        )}
      </div>
    </div>
  );
}

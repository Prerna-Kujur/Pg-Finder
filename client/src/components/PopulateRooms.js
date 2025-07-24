import React, { useState, useEffect } from "react";
import RoomCard from './RoomCard';
import axios from 'axios';

export default function PopulateRooms(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    // Fetch room data from your Express server when the component mounts
    axios.get(`${SERVER_URL}/api/getrooms`)
      .then((response) => {
        setRooms(response.data);
        setFilteredRooms(response.data);
      })
      .catch((error) => {
        console.error('Error fetching room data:', error);
      });
  }, [SERVER_URL]);

  useEffect(() => {
    let filtered = rooms.filter((room) => {
      const {
        price,
        roomName,
        addressLine1,
        area,
        city,
        features,
        ownerFirstName,
        ownerLastName,
      } = room;

      if (
        props.selectedPriceRange &&
        props.selectedPriceRange !== "" &&
        price >= parseInt(props.selectedPriceRange)
      ) {
        return false;
      }

      for (const feature of props.selectedFeatures) {
        if (!features.includes(feature)) {
          return false;
        }
      }

      if (
        (props.searchText &&
          props.searchText !== "" &&
          !roomName.toLowerCase().includes(props.searchText.toLowerCase()))
      ) {
        return false;
      }

      const fullAddress = `${addressLine1}, ${area}, ${city}`.toLowerCase();
      if (
        props.searchAddress &&
        props.searchAddress !== "" &&
        !fullAddress.includes(props.searchAddress.toLowerCase())
      ) {
        return false;
      }

      // Combine and normalize owner's first and last name for searching
      const fullName = `${ownerFirstName} ${ownerLastName}`.toLowerCase();
      const searchNames = props.searchOwnerName
        .toLowerCase()
        .split(" ")
        .filter((name) => name.trim() !== ""); // Split and filter out empty parts

      // Check if any part of the search term matches any part of the owner's full name
      for (const searchName of searchNames) {
        if (!fullName.includes(searchName)) {
          return false;
        }
      }

      return true;
    });

    const sortedFilteredRooms = [...filtered];
    if (props.sortingOrder === "asc") {
      sortedFilteredRooms.sort((a, b) => a.price - b.price);
    } else {
      sortedFilteredRooms.sort((a, b) => b.price - a.price);
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
  ]);

  return (
    <div className="populate-rooms-container">
      {filteredRooms.map((room, index) => (
        <RoomCard key={index} {...room} />
      ))}
    </div>
  );
}

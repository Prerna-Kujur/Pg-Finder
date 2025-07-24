import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/FeaturedCard.css";

export default function FeaturedCard(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const {
    roomName,
    ownerFirstName,
    ownerLastName,
    rating,
    thumbnailImage,
    roomId,
    addressLine1,
    area,
    city,
    price,
  } = props;

  const handleCheckDetails = () => {
    navigate(`/roomdetails?id=${roomId}`);
  };

  const getThumbnailImageUrl = (thumbnailPath) => {
    const baseUrl = SERVER_URL;
    return `${baseUrl}${thumbnailPath}`;
  };

  return (
    <div className="custom-featured-card">
      <div className="custom-image">
        <img
          src={getThumbnailImageUrl(thumbnailImage)}
          alt={roomName}
          className="custom-image-style"
        />
      </div>
      <div className="custom-info">
        <h3 className="custom-name">{roomName}</h3>
        <p className="custom-owner-name">Owner: {ownerFirstName} {ownerLastName}</p>
        <p className="custom-address">Address: {addressLine1}, {area}, {city}</p>
        <p className="custom-price">Price: Rs {price} per month</p>
        <p className="custom-rating">Rating: {rating}</p>
        <button className="custom-check-details-button" onClick={handleCheckDetails}>
          Check Details
        </button>
      </div>
    </div>
  );
}

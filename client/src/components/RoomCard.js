import React from "react";
import "./styles/RoomCard.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function RoomCard(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate(); // Get the navigate function from React Router
  const userId = localStorage.getItem("userId"); // Step 1: Retrieve userId from localStorage

  function getRatingText(rating, peopleRated) {
    if (peopleRated === 0) {
      return "No Reviews Yet";
    } else if (rating >= 5) {
      return "Excellent";
    } else if (rating >= 4) {
      return "Great";
    } else if (rating >= 3) {
      return "Good";
    } else if (rating >= 2) {
      return "Fair";
    } else {
      return "Worst";
    }
  }

  const {
    roomName,
    ownerFirstName,
    ownerLastName,
    addressLine1,
    area,
    city,
    rating,
    peopleRated,
    features,
    price,
    thumbnailImage,
  } = props;

  const ratingText = getRatingText(rating, peopleRated);

  // Check if features is defined and is a non-empty string
  const featureIcons =
    features && typeof features === "string" ? features.split(",") : [];

  const getThumbnailImageUrl = (thumbnailPath) => {
    // You may need to replace 'YOUR_BASE_URL' with the actual base URL of your images.
    const baseUrl = SERVER_URL; // Replace with your actual base URL
    return `${baseUrl}${thumbnailPath}`;
  };

  const handleCheckDetails = () => {
    // Navigate to the room details page with the room ID
    navigate(`/roomdetails?id=${props.roomId}`);
  };

  const isOwner = userId === props.ownerId;

  return (
    <div className="RoomCard">
      {/* <div className="favorite-icon">
        <i className="fas fa-heart"></i>
      </div> */}
      <div className="image">
        <img
          src={getThumbnailImageUrl(thumbnailImage)}
          alt={roomName}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      <div className="info">
        <h3 className="name">{roomName}</h3>
        <p>
          <strong className="room-card-bold-text">Owner</strong> -{" "}
          {ownerFirstName} {ownerLastName}
        </p>
        <p>
          <strong className="room-card-bold-text">Address</strong> -{" "}
          {addressLine1}, {area}, {city}
        </p>
        <p className="rating">
          <strong className="room-card-bold-text">Rating:</strong>
          <span className="rating-value">{rating}</span>
          <span className="review-count">
            <strong className="room-card-bold-text">Reviews: </strong>
            {peopleRated}
          </span>
          <span className="rating-text">{ratingText}</span>
        </p>
        <div className="features">
          {featureIcons.map((icon, index) => (
            <i key={index} className={`fas ${icon.trim()}`}></i>
          ))}
        </div>
      </div>
      <div className="room-price">
        <span className="price-value">Rs {price}</span>
        <span className="price-text">per month</span>
        <div className="buttons">
          <button className="check-details-button" onClick={handleCheckDetails}>
            Check Details
          </button>
          {!isOwner && <button className="book-button">Book Now</button>}
        </div>
      </div>
    </div>
  );
}

export default RoomCard;















// import React from "react";
// import "./styles/RoomCard.css";
// import { useNavigate } from "react-router-dom"; // Import useNavigate


// function RoomCard(props) {
//   const SERVER_URL = process.env.REACT_APP_SERVER_URL;

//   const navigate = useNavigate(); // Get the navigate function from React Router
//   const userId = localStorage.getItem("userId"); // Step 1: Retrieve userId from localStorage


//   function getRatingText(rating, peopleRated) {
//     if (peopleRated === 0) {
//       return "No Reviews Yet";
//     } else if (rating >= 5) {
//       return "Excellent";
//     } else if (rating >= 4) {
//       return "Great";
//     } else if (rating >= 3) {
//       return "Good";
//     } else if (rating >= 2) {
//       return "Fair";
//     } else {
//       return "Worst";
//     }
//   }

//   const {
//     roomName,
//     ownerFirstName,
//     ownerLastName,
//     addressLine1,
//     area,
//     city,
//     rating,
//     peopleRated,
//     features,
//     price,
//     thumbnailImage,
//   } = props;

//   const ratingText = getRatingText(rating, peopleRated);

//   // Check if features is defined and is a non-empty string
//   const featureIcons =
//     features && typeof features === "string" ? features.split(",") : [];

//   const getThumbnailImageUrl = (thumbnailPath) => {
//     // You may need to replace 'YOUR_BASE_URL' with the actual base URL of your images.
//     const baseUrl = SERVER_URL; // Replace with your actual base URL
//     return `${baseUrl}${thumbnailPath}`;
//   };

//   const handleCheckDetails = () => {
//     // Navigate to the room details page with the room ID
//     navigate(`/roomdetails?id=${props.roomId}`);
//   };

//   const isOwner = userId === props.ownerId;

//   return (
//     <div className="RoomCard">
//       <div className="favorite-icon">
//         <i className="fas fa-heart"></i>
//       </div>
//       <div className="image">
//         <img
//           src={getThumbnailImageUrl(thumbnailImage)}
//           alt={roomName}
//           style={{ objectFit: "cover", width: "100%", height: "100%" }}
//         />
//       </div>

//       <div className="info">
//         <h3 className="name">{roomName}</h3>
//         <p>
//           <strong className="room-card-bold-text">Owner</strong> -{" "}
//           {ownerFirstName} {ownerLastName}
//         </p>
//         <p>
//           <strong className="room-card-bold-text">Address</strong> -{" "}
//           {addressLine1}, {area}, {city}
//         </p>
//         <p className="rating">
//           <strong className="room-card-bold-text">Rating:</strong>
//           <span className="rating-value">{rating}</span>
//           <span className="review-count">
//             <strong className="room-card-bold-text">Reviews: </strong>
//             {peopleRated}
//           </span>
//           <span className="rating-text">{ratingText}</span>
//         </p>
//         <div className="features">
//           {featureIcons.map((icon, index) => (
//             <i key={index} className={`fas ${icon.trim()}`}></i>
//           ))}
//         </div>
//       </div>
//       <div className="room-price">
//         <span className="price-value">Rs {price}</span>
//         <span className="price-text">per month</span>
//         <div className="buttons">
//           {/* <button className="check-details-button">Check Details</button> */}
//           <button className="check-details-button" onClick={handleCheckDetails}>Check Details</button>
//           {!isOwner && (
//             <button className="book-button">Book Now</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RoomCard;

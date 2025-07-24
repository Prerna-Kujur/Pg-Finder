const express = require("express");
const router = express.Router();
const Room = require("../models/Room"); // Import your Room model

// Route to get a list of featured rooms with specific fields, including roomId
router.get("/getfeaturedrooms", async (req, res) => {
  try {
    // Fetch featured rooms from the database based on your criteria (e.g., where "featured" is true)
    const featuredRooms = await Room.find({ featured: true }).select([
      "_id", // Include the roomId field
      "roomName",
      "ownerId",
      "ownerFirstName",
      "ownerLastName",
      "addressLine1",
      "area",
      "city",
      "rating",
      "peopleRated",
      "features",
      "price",
      "thumbnailImage",
    ]);

    // Map the featuredRooms data to include roomId
    const roomsWithId = featuredRooms.map((room) => ({
      roomId: room._id,
      ...room._doc, // Include all other selected fields
    }));

    // Send the list of featured rooms with selected fields as a JSON response
    res.status(200).json(roomsWithId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Room = require("../models/Room"); // Import your Room model

// Route to get a list of rooms with specific fields, including roomId
router.get("/getrooms", async (req, res) => {
  try {
    // Specify the fields you want to retrieve, including roomId
    const rooms = await Room.find().select([
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
      "thumbnailImage"
    ]);

    // Map the rooms data to include roomId
    const roomsWithId = rooms.map((room) => {
      return {
        roomId: room._id,
        ...room._doc, // Include all other selected fields
      };
    });

    // Send the list of rooms with selected fields as a JSON response
    res.status(200).json(roomsWithId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

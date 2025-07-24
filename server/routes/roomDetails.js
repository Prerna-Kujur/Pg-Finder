const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// Route to get a specific room by ID
router.get("/getroom/:roomId", async (req, res) => {
  try {
    const roomId = req.params.roomId;
    // Fetch the room by its ID
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

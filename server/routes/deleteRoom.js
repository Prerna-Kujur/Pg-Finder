const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// Route to delete a specific room by ID
router.delete("/deleteroom/:roomId", async (req, res) => {
  try {
    const roomId = req.params.roomId;

    // Fetch the room by its ID
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    await room.deleteOne();

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

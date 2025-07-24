const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // Import the Message model

// Create a new message
router.post('/messages', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Respond with a success message
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Error saving message' });
  }
});

module.exports = router;

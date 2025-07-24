const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model

// Endpoint to check if the username or email exists
router.post('/checkUsername', async (req, res) => {
  try {
    const { usernameOrEmail } = req.body;

    // Check if a user with the given username or email exists in your database
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (user) {
      // If the user exists, return a success response
      res.status(200).json({ message: 'Username exists' });
    } else {
      // If the user does not exist, return an error response with the error message
      res.status(404).json({ error: 'Username does not exist' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

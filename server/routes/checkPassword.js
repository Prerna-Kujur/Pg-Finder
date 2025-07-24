const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
require('dotenv').config(); // Load environment variables from .env file

// Endpoint to handle user login
router.post('/login', async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Find the user by username or email
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      // User not found
      return res.status(401).json({ error: 'Invalid username/email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Passwords do not match
      return res.status(401).json({ error: 'Invalid username/email or password' });
    }

    // At this point, the login is successful.

    // Generate a JWT token using the secret key from the .env file
    

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.SECRET_KEY, // Access the secret key from the environment variables
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
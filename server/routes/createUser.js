const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For password hashing
const upload = require('../middlewares/imageUploader'); // Import the image uploader middleware
const User = require('../models/User');

// Route to create a new user account with profile image handling
router.post('/register', upload.single('profileImage'), async (req, res) => {
  try {
    // Destructure user input from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      gender,
    } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving it
    const saltRounds = 10; // You can adjust the number of salt rounds for security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Determine the profile picture link based on whether a file was uploaded
    let profilePictureLink = '';
    if (req.file) {
      profilePictureLink = `/uploads/${req.file.filename}`;
    } else {
      profilePictureLink = '/uploads/default.png';
    }

    // Create a new user object with default values for other fields
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store the hashed password
      dateOfBirth: dateOfBirth || '', // Default to empty string if not provided
      gender: gender || '', // Default to empty string if not provided
      addressLine1: '',
      addressLine2: '',
      area: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      aadhaarNumber: '',
      mobileNumber: '',
      
      profilePictureLink,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
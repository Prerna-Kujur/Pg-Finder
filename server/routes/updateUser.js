const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model
const verifyToken = require('../middlewares/authMiddleware'); // Import the authentication middleware
const upload = require('../middlewares/imageUploader'); // Import the image uploader middleware
const path = require('path');
const fs = require('fs'); // Import the Node.js file system module

// Route to update user profile data, protected by the verifyToken middleware
router.put('/profile/:userId', verifyToken, upload.single('profileImage'), async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from the route parameter

    // Destructure updated user input from the request body
    const {
      firstName,
      lastName,
      email,
      gender,
      addressLine1,
      addressLine2,
      area,
      city,
      state,
      country,
      pincode,
      aadhaarNumber,
      mobileNumber,
      profilePictureLink
    } = req.body;

    // Find the user by their userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user already has a profile picture and if a new one is uploaded
    if (req.file) {
      // Construct the full path to the old profile picture for deletion
      if (user.profilePictureLink !== '/uploads/default.png') {
        const oldProfilePicturePath = path.join(__dirname, '..', user.profilePictureLink);

        // Check if the old image file exists and delete it
        if (fs.existsSync(oldProfilePicturePath)) {
          fs.unlinkSync(oldProfilePicturePath);
        }
      }

      // Update the 'profilePictureLink' to the new file path
      user.profilePictureLink = `/uploads/${req.file.filename}`;
    }

    // Update all the user's profile data
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.gender = gender;
    user.addressLine1 = addressLine1;
    user.addressLine2 = addressLine2;
    user.area = area;
    user.city = city;
    user.state = state;
    user.country = country;
    user.pincode = pincode;
    user.aadhaarNumber = aadhaarNumber;
    user.mobileNumber = mobileNumber;

    // Update the 'updatedAt' field to the current date and time
    user.updatedAt = new Date();

    // Save the updated user data to the database
    await user.save();

    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
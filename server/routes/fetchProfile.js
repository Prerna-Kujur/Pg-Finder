const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../middlewares/authMiddleware"); // Import the middleware


require("dotenv").config(); // Load environment variables from .env file

// Route to fetch a user's profile data
router.get("/profile/:userId", verifyToken, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Ensure that the requested user ID matches the authenticated user's ID
    if (userId !== req.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Find the user by their ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the profileData object with fields as specified
    const profileData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      addressLine1: user.addressLine1,
      addressLine2: user.addressLine2,
      area: user.area,
      city: user.city,
      state: user.state,
      country: user.country,
      pincode: user.pincode,
      accountStatus: user.accountStatus,
      verificationStatus: user.verificationStatus,
      aadhaarNumber: user.aadhaarNumber,
      mobileNumber: user.mobileNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profilePictureLink: user.profilePictureLink,
    };

    res.status(200).json(profileData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

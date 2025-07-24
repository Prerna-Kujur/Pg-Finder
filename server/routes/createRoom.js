const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Room = require("../models/Room"); // Import your Room model

// Define the storage for multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadDir = path.join(__dirname, "../uploads/rooms/");

    // Create the uploads folder if it doesn't exist
    fs.mkdirSync(uploadDir, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating uploads directory:", err);
      }
    });

    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    const fileName = `room_${Date.now()}${ext}`;
    callback(null, fileName);
  },
});

// Initialize multer with the defined storage
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, callback) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(ext)) {
      return callback(null, true);
    }

    const error = new Error("Invalid file type. Only images are allowed.");
    error.status = 400;
    callback(error);
  },
});

// Route to create a new room
router.post(
  "/createroom",
  upload.fields([
    { name: "thumbnailImage", maxCount: 1 },
    { name: "photos", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      // Destructure room data from the request body
      const {
        roomName,
        capacity,
        price,
        features,
        amenities,
        nearbyFacilities,
        description,
        availability,
        ownerFirstName,
        ownerLastName,
        addressLine1,
        addressLine2,
        area,
        city,
        state,
        country,
        pincode,
        ownerId,
      } = req.body;

      // Get the uploaded thumbnail image file path
      const thumbnailImagePath = req.files["thumbnailImage"]
        ? req.files["thumbnailImage"][0].path
        : null;

      // Get the uploaded photos file paths
      const photoImagePaths = req.files["photos"]
        ? req.files["photos"].map((file) => file.path)
        : [];

      // Create a new room object with file paths for thumbnailImage and photos
      const newRoom = new Room({
        roomName,
        capacity,
        price,
        features,
        amenities,
        nearbyFacilities,
        description,
        availability,
        ownerFirstName,
        ownerLastName,
        addressLine1,
        addressLine2,
        area,
        city,
        state,
        country,
        pincode,
        ownerId,
        rating:0,
        peopleRated:0,
        thumbnailImage: thumbnailImagePath
          ? `/uploads/rooms/${path.basename(thumbnailImagePath)}`
          : null,
        photos: photoImagePaths.map(
          (photoImagePath) => `/uploads/rooms/${path.basename(photoImagePath)}`
        ),
      });

      // Save the room to the database
      await newRoom.save();

      res.status(201).json({ message: "Room created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;

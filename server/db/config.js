const mongoose = require('mongoose');
require('dotenv').config();

// Get the MongoDB connection URI from the .env file
const mongodbURI = process.env.MONGODB_URI;

console.log("Mongo URI from .env:", mongodbURI);

// Create a function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
};

module.exports = connectDB;

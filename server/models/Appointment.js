const mongoose = require("mongoose");

// Define the Appointment schema
const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  additionalNotes: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "cancelled", "approved", "completed"],
    default: "pending",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Appointment model
const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;

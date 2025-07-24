// Import necessary modules
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // Assuming your Appointment model is in the specified location

// Define a route to handle the POST request to save an appointment
router.post('/schedule', async (req, res) => {
  try {
    // Create a new appointment instance based on the request body
    const newAppointmentData = req.body;
    newAppointmentData.status = 'pending'; // Set the default status as 'pending'
    const newAppointment = new Appointment(newAppointmentData);

    // Save the appointment to the database
    await newAppointment.save();

    // Respond with a success message or the saved appointment data
    res.status(201).json({ message: 'Appointment saved successfully', appointment: newAppointment });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error('Error saving appointment:', error);
    res.status(500).json({ error: 'An error occurred while saving the appointment' });
  }
});

module.exports = router;

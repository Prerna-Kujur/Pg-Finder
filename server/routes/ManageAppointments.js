// Import necessary modules
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // Assuming your Appointment model is in the specified location

// Define a route to handle the GET request to retrieve user's appointments
router.get('/appointments/:userId', async (req, res) => {
  try {
    // Retrieve appointments for a specific user based on userId
    const userId = req.params.userId;
    // const userAppointments = await Appointment.find({ userId });
    const userAppointments = await Appointment.find({
      $or: [
        { userId: userId },
        { ownerId: userId }
      ]
    });

    // Respond with the user's appointments
    res.status(200).json(userAppointments);
  } catch (error) {
    // Handle errors and respond with an error message
    console.error('Error fetching user appointments:', error);
    res.status(500).json({ error: 'An error occurred while fetching user appointments' });
  }
});

// Define a route to handle appointment status updates (PUT request)
router.put('/appointments/:appointmentId', async (req, res) => {
  try {
    // Retrieve the appointment by appointmentId
    const appointmentId = req.params.appointmentId;
    const updatedStatus = req.body.status; // Assuming you send the new status in the request body

    // Update the status of the appointment
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: updatedStatus },
      { new: true } // To get the updated appointment object
    );

    // Respond with the updated appointment
    res.status(200).json(updatedAppointment);
  } catch (error) {
    // Handle errors and respond with an error message
    console.error('Error updating appointment status:', error);
    res.status(500).json({ error: 'An error occurred while updating appointment status' });
  }
});

module.exports = router;

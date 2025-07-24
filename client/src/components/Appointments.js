import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Appointments.css";
import { useNavigate } from 'react-router-dom';

export default function UserAppointments() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;  

  const navigate = useNavigate(); // Initialize useNavigate


  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // If not logged in, navigate to /login
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    axios
      .get(`${SERVER_URL}/api/appointments/${userId}`)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [SERVER_URL,navigate]);

  const determineNewStatus = (action) => {
    switch (action) {
      case "cancel":
        return "cancelled";
      case "approve":
        return "approved";
      case "complete":
        return "completed";
      default:
        return "";
    }
  };

  const handleAppointmentAction = (appointmentId, action) => {
    const newStatus = determineNewStatus(action);

    // Check the current status of the appointment
    const currentAppointment = appointments.find(
      (appointment) => appointment._id === appointmentId
    );

    if (currentAppointment) {
      const currentStatus = currentAppointment.status;

      // Check the conditions and allow or prevent actions accordingly
      if (currentStatus === "pending") {
        if (action === "cancel" || action === "approve") {
          axios
            .put(`${SERVER_URL}/api/appointments/${appointmentId}`, {
              status: newStatus,
            })
            .then((response) => {
              // Update the local state with the updated appointment status
              const updatedAppointments = appointments.map((appointment) =>
                appointment._id === appointmentId
                  ? { ...appointment, status: newStatus }
                  : appointment
              );
              setAppointments(updatedAppointments);
            })
            .catch((error) => {
              console.error("Error updating appointment status:", error);
            });
        }
      } else if (currentStatus === "approved") {
        if (action === "complete") {
          axios
            .put(`http://localhost:3001/api/appointments/${appointmentId}`, {
              status: newStatus,
            })
            .then((response) => {
              // Update the local state with the updated appointment status
              const updatedAppointments = appointments.map((appointment) =>
                appointment._id === appointmentId
                  ? { ...appointment, status: newStatus }
                  : appointment
              );
              setAppointments(updatedAppointments);
            })
            .catch((error) => {
              console.error("Error updating appointment status:", error);
            });
        }
      } else {
        // For other statuses (completed or cancelled), do not perform any action
        console.log(
          "Cannot take actions for appointments with status: " + currentStatus
        );
      }
    }
  };

  return (
    <div className="user-appointments-container">
      <h2>Your Appointments</h2>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id} className="appointment-row">
              <td>{appointment.roomName}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
              <td>
                <div className="action-buttons">
                  {appointment.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleAppointmentAction(appointment._id, "cancel")
                        }
                        className="action-button cancel"
                      >
                        <i className="fas fa-ban"></i> Cancel
                      </button>
                      {(userId === appointment.ownerId) && ( // Check if userId matches ownerId
                        <button
                          onClick={() =>
                            handleAppointmentAction(appointment._id, "approve")
                          }
                          className="action-button approve"
                        >
                          <i className="fas fa-check"></i> Approve
                        </button>
                      )}
                    </>
                  )}
                  {appointment.status === "approved" && (
                    <button
                      onClick={() =>
                        handleAppointmentAction(appointment._id, "complete")
                      }
                      className="action-button complete"
                    >
                      <i className="fas fa-check-circle"></i> Complete
                    </button>
                  )}
                  {(appointment.status === "completed" ||
                    appointment.status === "cancelled") && (
                    <div className="cannot-take-action">No actions to take</div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
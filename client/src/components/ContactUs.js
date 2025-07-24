import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./styles/ContactUs.css";
import axios from "axios";

export default function ContactUs() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate(); // Access the history object for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      message,
    };

    try {
      await axios.post(`${SERVER_URL}/api/messages`, data);

      // Display success message
      setSuccessMessage("Message sent successfully!");

      // Clear the form fields after successful submission
      setName("");
      setEmail("");
      setMessage("");

      // Automatically navigate to the / route after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="contact-us-container">
      <h2 className="contact-us-title">Contact Us</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form className="contact-us-form" onSubmit={handleSubmit}>
      <p>Have any questions or concerns?</p>
      <p>No problem! Just fill out this form, and we'll get in touch with you shortly.</p>
      <br />
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="contact-us-input"
            placeholder="Your Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="contact-us-input"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            className="contact-us-input contact-us-textarea"
            placeholder="Your Message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit" className="contact-us-button">
          Submit
        </button>
      </form>
    </div>
  );
}
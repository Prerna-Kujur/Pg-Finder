import "./App.css";
import Header from "./components/Header";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Register";
import LoginUsername from "./components/LoginUsername";
import LoginPassword from "./components/LoginPassword";
import Profile from "./components/Profile";
import SearchLayout from "./components/SearchLayout";
import AddRoom from "./components/AddRoom";
import React from "react";
import YourRooms from "./components/YourRooms";
import RoomDetails from "./components/RoomDetails";
import isLoggedIn from "./utils/authUtils"; // Import the isLoggedIn function
import ContactUs from "./components/ContactUs";
import ScheduleVisit from "./components/ScheduleVisit";
import Appointments from "./components/Appointments";
import Home from "./components/Home";


function App() {
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);

  React.useEffect(() => {
    // Check if the user is logged in when the component mounts
    isLoggedIn().then((loggedIn) => {
      setUserLoggedIn(loggedIn);
    });
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roomdetails" element={<RoomDetails />} />
        <Route path="/search" element={<SearchLayout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<AddRoom />} />
        <Route path="/rooms" element={<YourRooms />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/schedule" element={<ScheduleVisit />} />
        <Route path="/appointments" element={<Appointments />} />




        {/* If user is logged in, redirect to home */}
        {userLoggedIn ? (
          <>
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/loginpass" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            {/* If user is not logged in, show login and register */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginUsername />} />
            <Route path="/loginpass" element={<LoginPassword />} />
            
            {/* Redirect other routes to /login */}
            <Route path="/profile" element={<Navigate to="/login" />} />
            <Route path="/create" element={<Navigate to="/login" />} />
            <Route path="/rooms" element={<Navigate to="/login" />} />
            <Route path="/schedule" element={<Navigate to="/login" />} />
            <Route path="/rooms" element={<Navigate to="/login" />} />
            <Route path="/appointments" element={<Navigate to='/login' />} />


          </>
        )}

        {/* Common routes */}
        
      </Routes>
    </>
  );
}

export default App;

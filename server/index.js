const express = require('express');
const connectDB = require('./db/config');
const createUser = require('./routes/createUser');
const checkUsername = require('./routes/checkUsername');
const checkPassword = require('./routes/checkPassword');
const fetchProfile = require('./routes/fetchProfile');
const updateUser = require('./routes/updateUser');
const checkSession = require('./routes/checkSession');
const createRoom = require('./routes/createRoom');
const getRooms = require('./routes/getRooms');
const roomDetails = require('./routes/roomDetails');
const createMessage = require('./routes/createMessage');
const createAppointment = require('./routes/createAppointment');
const ManageAppointments = require('./routes/ManageAppointments');
const deleteRoom = require('./routes/deleteRoom');
const getFeaturedRooms = require('./routes/getFeaturedRooms');







const cors = require('cors');



const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use("/uploads", express.static("uploads"));


//Use the user creation route

app.use('/api', createUser); // You can change '/users' to any desired route path
app.use('/api', checkUsername);
app.use('/api', checkPassword);

app.use('/api', fetchProfile);
app.use('/api', updateUser);
app.use('/api', checkSession);
app.use('/api', createRoom);
app.use('/api', getRooms);
app.use('/api', roomDetails);
app.use('/api', createMessage);
app.use('/api', createAppointment);
app.use('/api', ManageAppointments);
app.use('/api', deleteRoom);
app.use('/api', getFeaturedRooms);






// ... Add other routes and middleware for your application ...

// Define a default route for handling unspecified endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

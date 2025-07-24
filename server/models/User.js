const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Details
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },

  // Address Details
  addressLine1: String,
  addressLine2: String,
  area: String,
  city: String,
  state: String,
  country: String,
  pincode: String,

  // Account Details
  accountStatus: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  verificationStatus: {
    type: String,
    enum: ['Verified', 'Unverified'],
    default: 'Unverified',
  },
  aadhaarNumber: String,
  mobileNumber: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  profilePictureLink: String,

  // Password
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
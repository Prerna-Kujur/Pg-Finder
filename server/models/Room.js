const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  ownerFirstName: {
    type: String,
    required: true,
  },
  ownerLastName: {
    type: String,
    required: true,
  },
  ownerId:{
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  thumbnailImage: {
    type: String,
    required: true,
  },
  nearbyFacilities: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  photos: [String],
  features: String,
  amenities: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
    default:true,
  },
  rating: Number,
  peopleRated: Number,
  featured: Boolean,
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;

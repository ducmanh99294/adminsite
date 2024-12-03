const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TripSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  days: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
 
});

const tripModel = mongoose.model('tripModels', TripSchema)
module.exports = tripModel


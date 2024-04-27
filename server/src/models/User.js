const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  isRestaurant: { type: Boolean, default: false },
  restaurantInfo: {
    name: { type: String },
    location: { type: String },
    contactInfo: { type: String },
    operatingHours: { type: String },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
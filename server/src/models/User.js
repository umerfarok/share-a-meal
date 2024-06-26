const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  isRestaurant: { type: Boolean, default: false },
  restaurantInfo: {
    name: { type: String },
    location: { type: String },
    contactInfo: { type: String },
    operatingHours: {
      monday: { type: String },
      tuesday: { type: String },
      wednesday: { type: String },
      thursday: { type: String },
      friday: { type: String },
      saturday: { type: String },
      sunday: { type: String },
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
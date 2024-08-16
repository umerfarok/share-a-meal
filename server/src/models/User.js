const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isRestaurant: { type: Boolean, default: false },
  restaurantInfo: {
    name: { type: String },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: [Number],
    },
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
    cuisine: [String],
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ 'restaurantInfo.location': '2dsphere' });

const User = mongoose.model('User', userSchema);

module.exports = User;
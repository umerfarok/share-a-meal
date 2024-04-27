const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  expirationDate: { type: Date },
  dietaryInfo: { type: String },
  claimed: { type: Boolean, default: false },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
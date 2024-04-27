const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  reportedAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
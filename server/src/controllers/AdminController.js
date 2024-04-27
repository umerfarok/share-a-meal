const User = require('../models/User');
const Listing = require('../models/Listing');
const Report = require('../models/Report');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate('restaurant', 'name location');
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('user', 'email').populate('listing', 'foodType');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add more methods for handling specific user, listing, and report operations
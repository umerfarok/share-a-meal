const Listing = require('../models/Listing');

exports.createListing = async (req, res) => {
  try {
    const { foodType, quantity, expirationDate, dietaryInfo } = req.body;
    const restaurant = req.user.sub; 

    const newListing = new Listing({
      restaurant,
      foodType,
      quantity,
      expirationDate,
      dietaryInfo,
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find({ claimed: false }).populate('restaurant', 'name location');
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.claimListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const userId = req.user.sub; 
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (listing.claimed) {
      return res.status(400).json({ error: 'Listing has already been claimed' });
    }

    listing.claimed = true;
    listing.claimedBy = userId;
    await listing.save();

    res.status(200).json({ message: 'Listing claimed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
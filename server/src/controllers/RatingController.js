const Rating = require('../models/Rating');

exports.createRating = async (req, res) => {
  try {
    const { restaurantId, mealId, rating, comment } = req.body;
    const userId = req.user.sub; // Assuming req.user.sub contains the user ID from the JWT

    const newRating = new Rating({
      restaurant: restaurantId,
      meal: mealId,
      user: userId,
      rating,
      comment,
    });

    const savedRating = await newRating.save();
    res.status(201).json(savedRating);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add additional methods for fetching ratings, updating ratings, etc.

exports.getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.status(200).json(ratings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// getrating by resturent id
exports.getRatingByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const ratings = await Rating.find({ restaurant: restaurantId });
    res.status(200).json(ratings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

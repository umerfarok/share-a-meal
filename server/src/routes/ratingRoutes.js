const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/RatingController');
const authController = require('../controllers/AuthController');

// Middleware to verify authentication
router.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = await authController.verifyToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'Authorization header missing' });
  }
});

router.post('/', ratingController.createRating);

// Add routes for fetching ratings, updating ratings, etc.
router.get('/', ratingController.getRatings);
router.get('/restaurant/:restaurantId', ratingController.getRatingByRestaurantId);


module.exports = router;
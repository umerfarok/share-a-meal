const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/RestaurantController');
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

router.get('/profile', restaurantController.getRestaurantProfile);
router.post('/profile', restaurantController.createRestaurantProfile);
router.put('/profile', restaurantController.updateRestaurantProfile);
router.get('/nearby', restaurantController.getNearbyRestaurants);


module.exports = router;
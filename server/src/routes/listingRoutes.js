const express = require('express');
const router = express.Router();
const listingController = require('../controllers/ListingController');
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

router.post('/create', listingController.createListing);
router.get('/all', listingController.getAllListings);
router.put('/claim/:listingId', listingController.claimListing);

module.exports = router;
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const authController = require('../controllers/AuthController');

// Middleware to verify authentication and admin role
router.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = await authController.verifyToken(token);
      req.user = decoded;
      console.log(decoded)
      // Check if the user has the admin role
      if (decoded['cognito:groups'].includes('SuperAdmin')) {
        next();
      } else {
        res.status(403).json({ error: 'Forbidden: Unauthorized access' });
      }
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'Authorization header missing' });
  }
});

router.get('/users', adminController.getUsers);
router.get('/listings', adminController.getListings);
router.get('/reports', adminController.getReports);


module.exports = router;
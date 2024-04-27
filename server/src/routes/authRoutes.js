const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    authController.verifyToken(token)
      .then((decoded) => {
        req.user = decoded;
        next();
      })
      .catch((err) => {
        res.status(401).json({ error: 'Invalid token' });
      });
  } else {
    res.status(401).json({ error: 'Authorization header missing' });
  }
});

// Add protected routes here
router.get('/protected', (req, res) => {
  res.json({ message: 'Access granted' });
});

module.exports = router;
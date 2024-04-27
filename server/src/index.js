const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const adminRoutes = require('./routes/adminRoutes');
const ratingRoutes = require('./routes/ratingRoutes'); // Import ratingRoutes

// MongoDB connection
mongoose.connect('mongodb://localhost/share-a-meal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/listings', listingRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/admin', adminRoutes);
app.use('/ratings', ratingRoutes); 

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
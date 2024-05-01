const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const adminRoutes = require('./routes/adminRoutes');
const ratingRoutes = require('./routes/ratingRoutes'); // Import ratingRoutes

// MongoDB connection
mongoose.connect('mongodb://maxstore:maxstore-password@localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(cors());
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
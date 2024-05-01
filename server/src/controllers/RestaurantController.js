const User = require('../models/User');

exports.getRestaurantProfile = async (req, res) => {
  try {
    const userId = req.user.sub; // Assuming req.user.sub contains the user ID from the JWT
    const user = await User.findById(userId);

    if (!user || !user.isRestaurant) {
      return res.status(404).json({ error: 'Restaurant profile not found' });
    }

    const { name, location, contactInfo, operatingHours } = user.restaurantInfo;
    res.status(200).json({ name, location, contactInfo, operatingHours });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRestaurantProfile = async (req, res) => {
  try {
    const userId = req.user.sub; 
    const { name, location, contactInfo, operatingHours } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          'restaurantInfo.name': name,
          'restaurantInfo.location': location,
          'restaurantInfo.contactInfo': contactInfo,
          'restaurantInfo.operatingHours': operatingHours,
        },
      },
      { new: true }
    );

    if (!user || !user.isRestaurant) {
      return res.status(404).json({ error: 'Restaurant profile not found' });
    }

    res.status(200).json({ message: 'Restaurant profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
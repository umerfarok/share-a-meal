const User = require('../models/User');
const geolib = require('geolib'); 
exports.getRestaurantProfile = async (req, res) => {
  try {
    const userId = req.user.sub; 
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
exports.createRestaurantProfile = async (req, res) => {
  try {
    const userId = req.user.sub; 
    const { name, location, contactInfo, operatingHours, isRestaurant } = req.body;

    const user = await User.create({
      userId,
      isRestaurant,
      restaurantInfo: {
        name,
        location,
        contactInfo,
        operatingHours,
      },
    });
    console.log(user)
    res.status(201).json({ message: 'Restaurant profile created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


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


exports.getNearbyRestaurants = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const restaurants = await User.find({ isRestaurant: true });

    const nearbyRestaurants = restaurants.filter((restaurant) => {
      const restaurantLocation = {
        latitude: restaurant.restaurantInfo.location.coordinates[1],
        longitude: restaurant.restaurantInfo.location.coordinates[0],
      };

      const distance = geolib.getDistance(
        { latitude, longitude },
        restaurantLocation
      );

      return distance <= 10000; 
    });

    res.status(200).json(nearbyRestaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
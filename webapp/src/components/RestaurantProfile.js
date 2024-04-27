import React, { useState, useEffect } from 'react';
import api from '../../../shared/utils/api';

const RestaurantProfile = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: '',
    location: '',
    contactInfo: '',
    operatingHours: '',
  });

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const response = await api.get('/restaurants/profile');
        setRestaurantInfo(response.data);
      } catch (error) {
        console.error('Error fetching restaurant info:', error);
      }
    };

    fetchRestaurantInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/restaurants/profile', restaurantInfo);
      console.log('Restaurant info updated successfully');
    } catch (error) {
      console.error('Error updating restaurant info:', error);
    }
  };

  return (
    <div>
      <h2>Restaurant Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Restaurant Name"
          value={restaurantInfo.name}
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={restaurantInfo.location}
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={restaurantInfo.contactInfo}
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, contactInfo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Operating Hours"
          value={restaurantInfo.operatingHours}
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, operatingHours: e.target.value })}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default RestaurantProfile;
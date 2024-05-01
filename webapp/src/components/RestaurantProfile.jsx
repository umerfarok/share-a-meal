import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/restaurants/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Restaurant Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Location: {profile.location}</p>
      <p>Contact Info: {profile.contactInfo}</p>
      <p>Operating Hours: {profile.operatingHours}</p>
    </div>
  );
};

export default RestaurantProfile;
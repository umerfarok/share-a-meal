import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateRestaurantProfile = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/restaurants/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setName(response.data.name);
        setLocation(response.data.location);
        setContactInfo(response.data.contactInfo);
        setOperatingHours(response.data.operatingHours);
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        '/api/restaurants/profile',
        { name, location, contactInfo, operatingHours },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Update Restaurant Profile</h2>
      {error && <p>{error}</p>}
      {success && <p>Profile updated successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contactInfo">Contact Information</label>
          <input
            type="text"
            id="contactInfo"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="operatingHours">Operating Hours</label>
          <input
            type="text"
            id="operatingHours"
            value={operatingHours}
            onChange={(e) => setOperatingHours(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateRestaurantProfile;
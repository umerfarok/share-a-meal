import React, { useState, useEffect } from 'react';
import { usePostApi, useGetApi } from '../api';

const UpdateRestaurantProfile = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { data: profile, error: profileError, isLoading: profileLoading } = useGetApi('/restaurants/profile', 'profile');
  const { mutate: createProfile } = usePostApi('/restaurants/profile');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createProfile(
        { name, location, contactInfo, operatingHours },
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
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default UpdateRestaurantProfile;
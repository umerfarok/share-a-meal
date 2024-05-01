import React, { useState } from 'react';
import axios from 'axios';

const CreateListing = () => {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [dietaryInfo, setDietaryInfo] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/listings/create',
        { foodType, quantity, expirationDate, dietaryInfo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setFoodType('');
        setQuantity('');
        setExpirationDate('');
        setDietaryInfo('');
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Create Listing</h2>
      {error && <p>{error}</p>}
      {success && <p>Listing created successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="foodType">Food Type</label>
          <input
            type="text"
            id="foodType"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="expirationDate">Expiration Date</label>
          <input
            type="date"
            id="expirationDate"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dietaryInfo">Dietary Information</label>
          <input
            type="text"
            id="dietaryInfo"
            value={dietaryInfo}
            onChange={(e) => setDietaryInfo(e.target.value)}
          />
        </div>
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default CreateListing;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RestaurantRatings = () => {
  const { restaurantId } = useParams();
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`/api/ratings/restaurant/${restaurantId}`);
        setRatings(response.data);
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    fetchRatings();
  }, [restaurantId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (ratings.length === 0) {
    return <p>No ratings available for this restaurant.</p>;
  }

  return (
    <div>
      <h2>Ratings</h2>
      <ul>
        {ratings.map((rating) => (
          <li key={rating._id}>
            <p>Rating: {rating.rating}</p>
            <p>Comment: {rating.comment}</p>
            <p>User: {rating.user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantRatings;
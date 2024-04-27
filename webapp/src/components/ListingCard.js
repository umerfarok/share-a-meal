import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  const { restaurant, foodType, quantity, expirationDate, dietaryInfo } = listing;

  return (
    <div className="listing-card">
      <h3>{restaurant.name}</h3>
      <p>Food Type: {foodType}</p>
      <p>Quantity: {quantity}</p>
      <p>Expiration Date: {expirationDate ? new Date(expirationDate).toLocaleDateString() : 'N/A'}</p>
      <p>Dietary Info: {dietaryInfo || 'N/A'}</p>
      <Link to={`/claim/${listing._id}`}>Claim</Link>
    </div>
  );
};

export default ListingCard;
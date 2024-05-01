import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ListingDetails = () => {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/listings/${listingId}`);
        setListing(response.data);
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    fetchListing();
  }, [listingId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!listing) {
    return <p>Loading...</p>;
  }
  const handleClaimListing = (listingId) => {
    // Add your logic here
};
  return (
    <div>
      <h2>{listing.foodType}</h2>
      <p>Quantity: {listing.quantity}</p>
      <p>Expiration Date: {listing.expirationDate}</p>
      <p>Dietary Information: {listing.dietaryInfo}</p>
      <p>Restaurant: {listing.restaurant.name}</p>
      <p>Location: {listing.restaurant.location}</p>
      {listing.claimed ? (
        <p>This listing has been claimed.</p>
      ) : (
        <button onClick={() => handleClaimListing(listing._id)}>
          Claim Listing
        </button>
      )}
    </div>
  );
};

export default ListingDetails;
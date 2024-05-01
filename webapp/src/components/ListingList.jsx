import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListingList = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/api/listings/all');
        setListings(response.data);
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    fetchListings();
  }, []);

  const handleClaimListing = async (listingId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `/api/listings/claim/${listingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setListings((prevListings) =>
          prevListings.map((listing) =>
            listing._id === listingId ? { ...listing, claimed: true } : listing
          )
        );
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Available Listings</h2>
      {error && <p>{error}</p>}
      {listings.length === 0 ? (
        <p>No listings available.</p>
      ) : (
        <ul>
          {listings.map((listing) => (
            <li key={listing._id}>
              <h3>{listing.foodType}</h3>
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
              <Link to={`/listings/${listing._id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListingList;
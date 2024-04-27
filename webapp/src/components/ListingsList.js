import React, { useState, useEffect } from 'react';
import api from '../../../shared/utils/api';
import ListingCard from './ListingCard';

const ListingsList = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get('/listings/all');
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <h2>Available Listings</h2>
      {listings.length === 0 ? (
        <p>No listings available at the moment.</p>
      ) : (
        <div className="listings-grid">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingsList;
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useApi } from '../api';

const ListingDetails = () => {
  const { listingId } = useParams();
  const { data: listingdata, error, isLoading } = useApi(`/api/listings/${listingId}`, 'listing');
  const [listing, setListing] = useState(null);


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
        setListing({ ...listing, claimed: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{listingdata.foodType}</h2>
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
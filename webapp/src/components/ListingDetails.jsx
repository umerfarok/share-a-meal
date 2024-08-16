import React from 'react';
import { useQuery, useMutation } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Card, CardContent, CircularProgress } from '@mui/material';
import { useGetApi, usePostApi } from '../api';

const ListingDetails = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { data: listing, error, isLoading } = useQuery(['listing', listingId], () => useGetApi(`/api/listings/${listingId}`, 'listing'));
  
  const claimMutation = useMutation((listingId) => usePostApi(`/api/listings/claim/${listingId}`, {}), {
    onSuccess: () => {
      navigate('/listings');
    },
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const handleClaim = () => {
    claimMutation.mutate(listingId);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>{listing.foodType}</Typography>
        <Typography>Quantity: {listing.quantity}</Typography>
        <Typography>Expiration Date: {new Date(listing.expirationDate).toLocaleDateString()}</Typography>
        <Typography>Dietary Information: {listing.dietaryInfo}</Typography>
        <Typography>Restaurant: {listing.restaurant.name}</Typography>
        <Typography>Location: {listing.restaurant.location}</Typography>
        {!listing.claimed && (
          <Button onClick={handleClaim} variant="contained" color="primary" disabled={claimMutation.isLoading}>
            {claimMutation.isLoading ? 'Claiming...' : 'Claim Listing'}
          </Button>
        )}
        {claimMutation.isError && (
          <Typography color="error">Error: {claimMutation.error.message}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ListingDetails;
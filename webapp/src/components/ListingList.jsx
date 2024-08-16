import React from 'react';

import { Link } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, Button, CircularProgress } from '@mui/material';
import { useGetApi } from '../api';

const ListingList = () => {
  const { data: listings, error, isLoading } =  useGetApi('/api/listings/all', 'listings')

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>Available Listings</Typography>
      </Grid>
      {listings.map((listing) => (
        <Grid item xs={12} sm={6} md={4} key={listing._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{listing.foodType}</Typography>
              <Typography>Quantity: {listing.quantity}</Typography>
              <Typography>Expiration Date: {new Date(listing.expirationDate).toLocaleDateString()}</Typography>
              <Typography>Restaurant: {listing.restaurant.name}</Typography>
              <Button component={Link} to={`/listings/${listing._id}`} variant="contained" color="primary">
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListingList;
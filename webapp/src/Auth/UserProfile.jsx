import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box } from '@mui/material';

export default function UserProfile() {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>User Profile</Typography>
      <Typography variant="body1" gutterBottom>Username: {user.username}</Typography>
      <Typography variant="body1" gutterBottom>Email: {user.attributes.email}</Typography>
      {/* Display any other user data here */}
      <Button
        variant="contained"
        color="primary"
        onClick={signOut}
        sx={{ mt: 2 }}
      >
        Sign Out
      </Button>
    </Box>
  );
}
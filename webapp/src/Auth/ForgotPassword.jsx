import React, { useState } from "react";
import { forgotPassword } from "./auth";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Box } from '@mui/material';

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await forgotPassword(username);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Reset password</Typography>
        <Typography gutterBottom>
          Check your email for the confirmation code to reset your password.
        </Typography>
        <Button component={Link} to="/reset-password" variant="contained" color="primary">
          Reset Password
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>Forgot Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      <Button
        fullWidth
        component={Link}
        to="/login"
        variant="text"
        sx={{ mt: 2 }}
      >
        Back to Sign In
      </Button>
    </Box>
  );
}
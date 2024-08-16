import React, { useState } from "react";
import { confirmSignUp, resendConfirmationCode } from "./auth";
import { TextField, Button, Typography, Box } from '@mui/material';

export default function ConfirmSignUp() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await confirmSignUp(username, code);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendConfirmationCode(username);
      setError("Confirmation code resent successfully.");
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Confirmation successful!</Typography>
        <Typography>You can now log in with your credentials. Go rock that app!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>Confirm Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirmation code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Confirm
        </Button>
      </form>
      <Button
        fullWidth
        variant="text"
        onClick={handleResendCode}
        sx={{ mt: 1 }}
      >
        Resend Code
      </Button>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Box>
  );
}
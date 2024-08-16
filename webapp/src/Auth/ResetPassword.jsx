import React, { useState } from "react";
import { confirmPassword } from "./auth";
import { TextField, Button, Typography, Box } from '@mui/material';

export default function ResetPassword() {
  const [username, setUsername] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await confirmPassword(username, confirmationCode, newPassword);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Reset password</Typography>
        <Typography>Your password has been reset successfully!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>Reset Password</Typography>
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
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="New password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Reset Password
        </Button>
      </form>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Box>
  );
}
import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Link } from "react-router-dom";
import { TextField, Button, Typography, Box } from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon } from '@mui/icons-material';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, signIn, loginWithGoogle, loginWithFacebook } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(username, password);
    } catch (err) {
      setError(err.message);
    }
  };

  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Login</Typography>
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
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
          <Typography color="primary">Forgot Password?</Typography>
        </Link>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={loginWithGoogle}
          sx={{ mb: 1 }}
        >
          Login with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FacebookIcon />}
          onClick={loginWithFacebook}
        >
          Login with Facebook
        </Button>
      </Box>
    </Box>
  );
}
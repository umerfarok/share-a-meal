import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { signUp, confirmSignUp, resendCode } from "./auth";
import { Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isRestaurant, setIsRestaurant] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1);
      } else {
        setCanResend(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, canResend]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); 
    setSecondsLeft(60);
    try {
      await signUp(username, email, password, isRestaurant);
      setIsSignedUp(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await confirmSignUp(username, code);
      setIsConfirmed(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    try {
      await resendCode(username);
      setCanResend(false);
      setSecondsLeft(60);
    } catch (err) {
      setError(err.message);
    }
  };

  const createUserProfile = (username, email) => {
    // Create basic user profile in the database
    console.log(`Creating basic user profile for ${username} with email ${email}`);
  };

  if (isConfirmed && isRestaurant) {
    return <RestaurantProfileForm />;
  }

  if (isConfirmed && !isRestaurant) {
    createUserProfile(username, email);
    return (
      <div className="flex h-screen w-full items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-md ">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold mb-5 text-purple-700">Confirmation successful!</h2>
            <Typography variant="body1">
              You can now log in with your credentials. Go rock that app!
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  if (isSignedUp) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-md ">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold mb-5 text-purple-700">Confirm sign Up</h2>
          </div>
          <form onSubmit={handleConfirm} className="space-y-4">
            <TextField
              className="w-full rounded-md"
              id="outlined-basic"
              label="Confirmation code"
              variant="outlined"
              color="secondary"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <div className="flex flex-row gap-4 items-center justify-center">
            <Button
              type="submit"
              variant="outlined"
              color="success"
              className="w-48 rounded-md mr-3"
            >
              Confirm
            </Button>
            <Button 
              onClick={handleResendCode}
              disabled={!canResend}
              variant="outlined"
              color="secondary"
              className="w-48 rounded-md "
            >
              Resend Code
            </Button>
            </div>
            <Typography className="text-center text-sm text-gray-500">
              {canResend
                ? "Code expired, you can resend"
                : `Resend in ${secondsLeft} seconds`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              If you don't receive the code, please check your spam folder.
            </Typography>
          </form>
          {error && <Typography color="error">{error}</Typography>}
        </div>
      </div>
    );
  }


  return (
    <div className="flex h-[600px] w-full items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-md ">
        <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold mb-5 text-purple-700">Sign up</h2>
        </div>
        <form onSubmit={handleSignUp} className="space-y-4">
          <TextField
            className="w-full rounded-md"
            id="outlined-basic"
            label="Username"
            variant="outlined"
            color="secondary"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className="w-full rounded-md"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            color="secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="w-full rounded-md"
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            color="secondary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
          className="w-full rounded-md bg-purple-800 py-2 font-medium text-white transition-colors hover:bg-purple-700/80 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 "
          type="submit"
        >
        Sign up
        </button>
          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="underline hover:text-gray-900">
              Login
            </Link>
          </div>
        </form>
        {error && <Typography color="error">{error}</Typography>}
      </div>
    </div>
  );
}
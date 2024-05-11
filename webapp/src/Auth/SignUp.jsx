import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from '@material-ui/core/Button';
import Typography from "@mui/material/Typography";
import { signUp, confirmSignUp, resendCode } from "./auth";
import { Link } from "react-router-dom";
import { usePostApi } from "../api";
import OperatingHoursDialog from "./OperatingHoursDialog";

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
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: "",
    location: "",
    contactInfo: "",
    operatingHours: {
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    },
  });
  const { mutate: createUserProfile } = usePostApi("/restaurants/profile");

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
      await signUp(username, email, password);
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
      handleCreateUserProfile();
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

  const handleCreateUserProfile = async (

  ) => {
    const data = {
      userId: username,
      email,
      isRestaurant,
      restaurantInfo: isRestaurant ? restaurantInfo : null,
    };

    try {
      const response = await createUserProfile(data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (isConfirmed && !isRestaurant) {
    return (
      <div className="flex h-screen w-full items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-md ">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold mb-5 text-purple-700">
              Confirmation successful!
            </h2>
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
            <h2 className="text-3xl font-semibold mb-5 text-purple-700">
              Confirm sign Up
            </h2>
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
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is-restaurant"
              checked={isRestaurant}
              onChange={(e) => setIsRestaurant(e.target.checked)}
            />
            <label htmlFor="is-restaurant">Signing up for a restaurant</label>
          </div>
          {isRestaurant && (
            <>
              <TextField
                className="w-full rounded-md"
                id="outlined-basic"
                label="Restaurant Name"
                variant="outlined"
                color="secondary"
                value={restaurantInfo.name}
                onChange={(e) =>
                  setRestaurantInfo({
                    ...restaurantInfo,
                    name: e.target.value,
                  })
                }
              />
              <TextField
                className="w-full rounded-md"
                id="outlined-basic"
                label="Restaurant Location"
                variant="outlined"
                color="secondary"
                value={restaurantInfo.location}
                onChange={(e) =>
                  setRestaurantInfo({
                    ...restaurantInfo,
                    location: e.target.value,
                  })
                }
              />
              <TextField
                className="w-full rounded-md"
                id="outlined-basic"
                label="Contact Information"
                variant="outlined"
                color="secondary"
                value={restaurantInfo.contactInfo}
                onChange={(e) =>
                  setRestaurantInfo({
                    ...restaurantInfo,
                    contactInfo: e.target.value,
                  })
                }
              />
              <OperatingHoursDialog
                restaurantInfo={restaurantInfo}
                setRestaurantInfo={setRestaurantInfo}
              />
            </>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full rounded-md"
          >
            Sign Up
          </Button>
        </form>
        {error && <Typography color="error">{error}</Typography>}
        <Typography variant="body2" color="textSecondary">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-700">
            Log in
          </Link>
        </Typography>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { usePostApi } from "../api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  form: {
    width: "100%",
    maxWidth: 400,
    marginTop: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  error: {
    color: "red",
    marginTop: theme.spacing(2),
  },
}));

export default function RestaurantProfileForm() {
  const classes = useStyles();
  const { mutate: createRestaurantProfile } = usePostApi("/restaurant-profile");

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    createRestaurantProfile({
      name,
      location,
      contactInfo,
      operatingHours,
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h2">Restaurant Profile</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          type="text"
          label="Restaurant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          className={classes.input}
          type="text"
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
        />
        <TextField
          className={classes.input}
          type="text"
          label="Contact Info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          fullWidth
        />
        <TextField
          className={classes.input}
          type="text"
          label="Operating Hours"
          value={operatingHours}
          onChange={(e) => setOperatingHours(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Profile
        </Button>
      </form>
      {error && <Typography className={classes.error}>{error}</Typography>}
    </div>
  );
}
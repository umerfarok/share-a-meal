import React, { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Grid, Select, MenuItem, FormControl, InputLabel, Chip, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';

const CreateListing = () => {
  const { control, handleSubmit, reset, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { token } = useContext(AuthContext);
  const [allergens, setAllergens] = useState([]);

  const expirationTimeUnit = watch('expirationTimeUnit', 'hours');

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const expirationDate = new Date();
    if (expirationTimeUnit === 'hours') {
      expirationDate.setHours(expirationDate.getHours() + (parseInt(data.expirationTime) || 4));
    } else {
      expirationDate.setDate(expirationDate.getDate() + (parseInt(data.expirationTime) || 1));
    }

    const formData = {
      ...data,
      expirationDate,
      allergens,
    };

    try {
      await postData('/api/listings/create', formData, token);
      setSuccess(true);
      reset();
      setAllergens([]);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const postData = async (endpoint, data, token) => {
    const config = {
      method: 'post',
      url: `${import.meta.env.VITE_APP_API_BASE_URL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    };

    const response = await axios(config);
    return response.data;
  };

  const handleAddAllergen = (allergen) => {
    if (allergen && !allergens.includes(allergen)) {
      setAllergens([...allergens, allergen]);
    }
  };

  const handleDeleteAllergen = (allergenToDelete) => {
    setAllergens(allergens.filter((allergen) => allergen !== allergenToDelete));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Create Listing</Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="foodType"
              control={control}
              defaultValue=""
              rules={{ required: 'Food type is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Food Type"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="quantity"
              control={control}
              defaultValue=""
              rules={{ required: 'Quantity is required', min: 1 }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Quantity"
                  type="number"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="expirationTime"
              control={control}
              defaultValue="4"
              rules={{ required: 'Expiration time is required', min: 1 }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Expiration Time"
                  type="number"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="expirationTimeUnit"
              control={control}
              defaultValue="hours"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Time Unit</InputLabel>
                  <Select {...field} label="Time Unit">
                    <MenuItem value="hours">Hours</MenuItem>
                    <MenuItem value="days">Days</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="dietaryInfo"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Dietary Information"
                  fullWidth
                  multiline
                  rows={2}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="newAllergen"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Add Allergen"
                  fullWidth
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddAllergen(e.target.value);
                      field.onChange('');
                    }
                  }}
                />
              )}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {allergens.map((allergen) => (
                <Chip
                  key={allergen}
                  label={allergen}
                  onDelete={() => handleDeleteAllergen(allergen)}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Listing'}
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">Error: {error}</Typography>
            </Grid>
          )}
          {success && (
            <Grid item xs={12}>
              <Typography color="success">Listing created successfully!</Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default CreateListing;
class CustomDateAdapter {
  constructor() {
    this.format = format;
    this.parse = parse;
    this.isValid = isValid;
    this.addHours = addHours;
    this.addDays = addDays;
  }

  formatByString(date, formatString) {
    return this.format(date, formatString);
  }

  parseByString(value, formatString) {
    return this.parse(value, formatString, new Date());
  }

  isValidDate(date) {
    return this.isValid(date);
  }

  addTime(date, amount, unit) {
    if (unit === 'hours') {
      return this.addHours(date, amount);
    } else if (unit === 'days') {
      return this.addDays(date, amount);
    }
    return date;
  }
}


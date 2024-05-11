import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ScheduleIcon from '@material-ui/icons/Schedule';

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
import propTypes from 'prop-types';

FormDialog.propTypes = {
  restaurantInfo: propTypes.object.isRequired,
  setRestaurantInfo: propTypes.func.isRequired,
};

export default function FormDialog({ restaurantInfo, setRestaurantInfo }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<ScheduleIcon />}
        onClick={handleClickOpen}
      >
        Set Operating Hours
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Set Operating Hours</DialogTitle>
        <DialogContent>
          {days.map((day) => (
            <Grid container spacing={3} key={day}>
              <Grid item xs={6}>
                <TextField
                  className="w-full rounded-md"
                  id={`outlined-basic-${day}-start`}
                  label={`Start time on ${day.charAt(0).toUpperCase() + day.slice(1)}`}
                  variant="outlined"
                  color="secondary"
                  value={restaurantInfo.operatingHours[day].split(' to ')[0]}
                  onChange={(e) =>
                    setRestaurantInfo({
                      ...restaurantInfo,
                      operatingHours: {
                        ...restaurantInfo.operatingHours,
                        [day]: `${e.target.value} to ${restaurantInfo.operatingHours[day].split(' to ')[1]}`,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className="w-full rounded-md"
                  id={`outlined-basic-${day}-end`}
                  label={`End time on ${day.charAt(0).toUpperCase() + day.slice(1)}`}
                  variant="outlined"
                  color="secondary"
                  value={restaurantInfo.operatingHours[day].split(' to ')[1]}
                  onChange={(e) =>
                    setRestaurantInfo({
                      ...restaurantInfo,
                      operatingHours: {
                        ...restaurantInfo.operatingHours,
                        [day]: `${restaurantInfo.operatingHours[day].split(' to ')[0]} to ${e.target.value}`,
                      },
                    })
                  }
                />
              </Grid>
            </Grid>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
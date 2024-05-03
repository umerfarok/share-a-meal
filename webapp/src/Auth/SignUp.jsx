import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { signUp, confirmSignUp, resendCode } from "./auth";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  error: {
    color: "red",
    marginTop: theme.spacing(2),
  },
  countdown: {
    fontSize: "0.8rem",
    marginTop: theme.spacing(1),
  },
}));

export default function Signup() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
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

  if (isConfirmed) {
    return (
      <div className={classes.root}>
        <Typography variant="h2">Confirmation successful!</Typography>
        <Typography variant="body1">
          You can now log in with your credentials. Go rock that app!
        </Typography>
      </div>
    );
  }

  if (isSignedUp) {
    return (
      <div className={classes.root}>
        <Typography variant="h2">Confirm Sign Up</Typography>
        <form className={classes.form} onSubmit={handleConfirm}>
          <TextField
            className={classes.input}
            type="text"
            label="Confirmation code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Confirm
          </Button>
          <Button
            onClick={handleResendCode}
            disabled={!canResend}
            variant="contained"
            color="secondary"
          >
            Resend Code
          </Button>
          <Typography className={classes.countdown}>
            {canResend ? "Code expired, you can resend" : `Resend in ${secondsLeft} seconds`}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            If you don't receive the code, please check your spam folder.
          </Typography>
        </form>
        {error && <Typography className={classes.error}>{error}</Typography>}
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Typography variant="h2">Signup</Typography>
      <form className={classes.form} onSubmit={handleSignUp}>
        <TextField
          className={classes.input}
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className={classes.input}
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={classes.input}
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </form>
      {error && <Typography className={classes.error}>{error}</Typography>}
    </div>
  );
}

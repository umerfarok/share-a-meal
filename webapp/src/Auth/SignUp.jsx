import { useState } from "react";
import { signUp, confirmSignUp, resendCode } from "./auth";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [canResend, setCanResend] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signUp(username, email, password);
      setIsSignedUp(true);
      setTimeout(() => setCanResend(true), 60000); 
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
      setTimeout(() => setCanResend(true), 60000); 
    } catch (err) {
      setError(err.message);
    }
  };

  if (isConfirmed) {
    return (
      <div>
        <h2>Confirmation successful!</h2>
        <p>You can now log in with your credentials. Go rock that app!</p>
      </div>
    );
  }

  if (isSignedUp) {
    return (
      <div>
        <h2>Confirm Sign Up</h2>
        <form onSubmit={handleConfirm}>
          <input
            type="text"
            placeholder="Confirmation code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit">Confirm</button>
          <button onClick={handleResendCode} disabled={!canResend}>
            Resend Code
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  }
  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
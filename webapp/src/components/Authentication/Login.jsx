import React, { useState } from 'react';
import Amplify from 'aws-amplify';

const Login = () => {
  const { Auth } = Amplify;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await Auth.signIn(email, password);
      // Redirect to the main page or perform any other actions after successful login
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle error cases
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
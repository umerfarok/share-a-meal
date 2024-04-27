import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      });
      // Handle successful registration, such as displaying a confirmation message
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error cases
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
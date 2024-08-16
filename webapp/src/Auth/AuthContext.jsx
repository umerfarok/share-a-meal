import React, { createContext, useState, useEffect } from "react";
import { Auth } from 'aws-amplify';
import * as authFunctions from "./auth";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  const getCurrentUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const session = await Auth.currentSession();
      setUser(user);
      setToken(session.getIdToken().getJwtToken());
      return user;
    } catch (err) {
      console.log(err);
      setUser(null);
      setToken(null);
      return null;
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getCurrentUser();
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const signIn = async (username, password) => {
    const result = await authFunctions.signIn(username, password);
    await getCurrentUser();
    return result;
  };

  const signOut = async () => {
    await authFunctions.signOut();
    setUser(null);
    setToken(null);
  };

  const loginWithGoogle = async () => {
    await authFunctions.federatedSignIn('Google');
  };

  const loginWithFacebook = async () => {
    await authFunctions.federatedSignIn('Facebook');
  };

  const isInGroup = (groupName) => {
    return user && user.signInUserSession.accessToken.payload['cognito:groups'] && 
           user.signInUserSession.accessToken.payload['cognito:groups'].includes(groupName);
  };

  const authValue = {
    user,
    token,
    isLoading,
    signIn,
    signOut,
    loginWithGoogle,
    loginWithFacebook,
    isInGroup,
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
import { createContext, useState, useEffect, useContext } from "react";
import * as auth from "./auth";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null); 

  const getCurrentUser = async () => {
    try {
      const { session: user, token } = await auth.getSession();
      setUser(user);
      setToken(token); 
      return user;
    } catch (err) {
      // not logged in
      console.log(err);
      setUser(null);
      setToken(null);
      return []
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
    await auth.signIn(username, password);
    // await auth.fetchUser();
  };
  const signOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  const authValue = {
    user,
    token,
    isLoading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };



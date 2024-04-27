import { Auth } from 'aws-amplify';

export const login = async (email, password) => {
  try {
    const user = await Auth.signIn(email, password);
    const session = user.getSignInUserSession();
    const token = session.getIdToken().getJwtToken();
    localStorage.setItem('token', token);
    return user;
  } catch (error) {
    throw error;
  }
};

export const register = async (email, password) => {
  try {
    const user = await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await Auth.signOut();
    localStorage.removeItem('token');
  } catch (error) {
    throw error;
  }
};
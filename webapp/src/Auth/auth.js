import { Auth } from 'aws-amplify';

export async function signUp(username, email, password) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function confirmSignUp(username, code) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    throw error;
  }
}

export async function resendConfirmationCode(username) {
  try {
    await Auth.resendSignUp(username);
  } catch (error) {
    throw error;
  }
}

export async function signIn(username, password) {
  try {
    const user = await Auth.signIn(username, password);
    return user;
  } catch (error) {
    throw error;
  }
}

export async function forgotPassword(username) {
  try {
    await Auth.forgotPassword(username);
  } catch (error) {
    throw error;
  }
}

export async function confirmPassword(username, code, newPassword) {
  try {
    await Auth.forgotPasswordSubmit(username, code, newPassword);
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch (error) {
    throw error;
  }
}

export async function getSession() {
  try {
    const session = await Auth.currentSession();
    return {
      session,
      token: session.getIdToken().getJwtToken(),
    };
  } catch (error) {
    throw error;
  }
}

export async function federatedSignIn(provider) {
  try {
    await Auth.federatedSignIn({ provider });
  } catch (error) {
    throw error;
  }
}
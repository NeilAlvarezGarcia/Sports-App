import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { AuthArgs } from './types/authenticaton';

const auth = getAuth();

async function login({ email, password }: AuthArgs) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    let message = '';
    if (err.code === 'auth/user-not-found') message = 'Email not found. type correctly the email';
    else if (err.code === 'auth/wrong-password')
      message = 'Password wrong. Click on "Forgot password" to change it';
    else if (err.code === 'auth/network-request-failed')
      message = 'Not internet connection to login';
    else message = 'Failed to login';

    return { error: message };
  }
}

async function signUp({ email, password }: AuthArgs) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    let message = '';
    if (err.code === 'auth/email-already-in-use') message = 'Email already in use';
    else if (err.code === 'auth/network-request-failed')
      message = 'Not internet connection to create the account';
    else message = 'Failed to create an account';

    return message;
  }
}

async function forgotPassword({ email }: Omit<AuthArgs, 'password'>) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: '' };
  } catch (err: any) {
    let message = '';
    if (err.code === 'auth/user-not-found')
      message = 'Email not found. type correctly the email to change the password';
    else if (err.code === 'auth/network-request-failed')
      message = 'Not internet connection to continue';
    else message = 'Something went wrong';

    return { error: message };
  }
}

async function logout() {
  await signOut(auth);
}

interface typeDataUser {
  displayName?: string;
  photoURL?: string;
}

async function updateUserProfile(profileData: typeDataUser) {
  if (auth.currentUser) {
    updateProfile(auth.currentUser, profileData);
  }
}

export { auth, login, signUp, forgotPassword, logout, updateUserProfile };

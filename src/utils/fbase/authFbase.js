import { firebaseApp } from './fbase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export const authService = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const createAccount = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(authService, email, password);
    return user;
  } catch (err) {
    const { message } = await err;
    return 'error' + message;
  }
};

export const loginAccount = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(authService, email, password);
    return user;
  } catch (err) {
    const { message } = await err;
    return message;
  }
};

export const authStateChanged = (setLogin, setInit, setUser) => {
  onAuthStateChanged(authService, (user) => {
    if (user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    setUser(user ?? null);
    setInit(true);
  });
};

export const googleLogin = async () => {
  const data = await signInWithPopup(authService, googleProvider);
  console.log('🚀 ~ file: fbase.js:61 ~ googleLogin ~ data', data);
};

export const githubLogin = async () => {
  const data = await signInWithPopup(authService, githubProvider);
  console.log('🚀 ~ file: fbase.js:68 ~ githubLogin ~ data', data);
};

export const logoutAccount = () => {
  signOut(authService);
};

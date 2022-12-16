import { initializeApp } from 'firebase/app';
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
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

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

export const authStateChanged = (setLogin, setInit) => {
  onAuthStateChanged(authService, (user) => {
    if (user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
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

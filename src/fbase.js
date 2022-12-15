import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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
export const createAccount = (email, password) => {
  createUserWithEmailAndPassword(authService, email, password)
    .then((userCredential) => {
      console.log(
        '🚀 ~ file: fbase.js:23 ~ createAccount ~ userCredential.user',
        userCredential.user
      );
    })
    .catch((err) => {
      console.log('🚀 ~ file: fbase.js:28 ~ createAccount ~ err', err.message);
      return err;
    });
};
export const loginAccount = (email, password) => {
  signInWithEmailAndPassword(authService, email, password)
    .then((userCredential) => {
      console.log('🚀 ~ file: fbase.js:34 ~ .then ~ userCredential', userCredential);
    })
    .catch((err) => {
      console.log('🚀 ~ file: fbase.js:37 ~ loginAccount ~ err', err.message);
    });
};

import { firebaseApp } from './fbase';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const dbService = getFirestore(firebaseApp);

export const addNewit = async (newit, user) => {
  try {
    await addDoc(collection(dbService, 'newits'), {
      text: newit,
      creatorId: user.uid,
      createdAt: Date.now(),
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getNewits = async () => await getDocs(collection(dbService, 'newits'));

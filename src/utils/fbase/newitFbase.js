import { firebaseApp } from './fbase';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

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

export const getNewits = async (setNewits) => {
  const dbQuery = query(collection(dbService, 'newits'), orderBy('createdAt', 'desc'));
  await onSnapshot(dbQuery, async (snapshot) => {
    const newitObj = await snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setNewits(newitObj);
  });
};

export const updateNewit = async (id, updateData) => {
  const updateRef = doc(dbService, 'newits', id);
  await updateDoc(updateRef, updateData);
};

export const deleteNewit = async (id) => {
  await deleteDoc(doc(dbService, 'newits', id));
};

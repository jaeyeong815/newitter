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
  where,
} from 'firebase/firestore';
import { onUnSubscribeChanged } from './authFbase';

const dbService = getFirestore(firebaseApp);

export const addNewit = async (newit, url, userId) => {
  try {
    await addDoc(collection(dbService, 'newits'), {
      text: newit,
      imageUrl: url,
      creatorId: userId,
      createdAt: Date.now(),
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getNewits = async (setNewits) => {
  const dbQuery = query(collection(dbService, 'newits'), orderBy('createdAt', 'desc'));
  const unSubscribe = await onSnapshot(dbQuery, async (snapshot) => {
    const newitObj = await snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setNewits(newitObj);
  });

  onUnSubscribeChanged(unSubscribe);
};

export const updateNewit = async (id, updateData) => {
  const updateRef = doc(dbService, 'newits', id);
  await updateDoc(updateRef, updateData);
};

export const deleteNewit = async (id) => {
  await deleteDoc(doc(dbService, 'newits', id));
};

export const getSpecificNewit = async (userId) => {
  const dbQuery = query(collection(dbService, 'newits'), where('creatorId', '==', userId));
  await onSnapshot(dbQuery, async (snapshot) => {
    snapshot.docs.forEach((doc) => console.log(doc.data()));
  });
};

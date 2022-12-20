import { firebaseApp } from './fbase';
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidV4 } from 'uuid';

export const storageService = getStorage(firebaseApp);
export const getImgUrl = async (userId, imgUrl) => {
  const imageRef = ref(storageService, `${userId}/${uuidV4()}`);
  const response = await uploadString(imageRef, imgUrl, 'data_url');
  const imageCloudUrl = await getDownloadURL(response.ref);
  return imageCloudUrl;
};
export const deleteImg = (imgUrl) => {
  const imageRef = ref(storageService, imgUrl);
  deleteObject(imageRef);
};

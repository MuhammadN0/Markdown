import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyDa4VHTPDE6p5yqx-B17evPjqrNzvMqHac',
  authDomain: 'markdown-bc67b.firebaseapp.com',
  projectId: 'markdown-bc67b',
  storageBucket: 'markdown-bc67b.appspot.com',
  messagingSenderId: '571228753128',
  appId: '1:571228753128:web:1a9e5b71c9abcffee10d5d',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

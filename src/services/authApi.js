import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from './firebase';
import toast from 'react-hot-toast';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';

const usersCollectionRef = collection(db, 'users');
export async function signupApi({
  email,
  password,
  profilePicture,
  displayName,
}) {
  try {
    const imageRefName = `avatars/${Math.random()}-${Math.random()}-${
      profilePicture.name
    }`;
    const imageRef = ref(storage, imageRefName);
    await uploadBytes(imageRef, profilePicture);
    const photoURL = await getDownloadURL(imageRef);
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    if (newUser) {
      console.log(newUser);
      await updateProfile(newUser.user, { displayName, photoURL });
      const userDoc = doc(usersCollectionRef, newUser.user.uid);
      await setDoc(userDoc, {
        photoURL,
        displayName,
        uid: newUser.user.uid,
      });
    } else {
      console.error('User creation failed');
    }
  } catch (error) {
    console.error(error.message);
  }
}
export async function updateUserApi({ profilePicture, displayName }) {
  try {
    const userDoc = doc(usersCollectionRef, auth.currentUser.uid);
    if (!profilePicture) {
      await updateProfile(auth.currentUser, { displayName });
      await updateDoc(userDoc, { displayName });
    } else {
      const imageRefName = `avatars/${Math.random()}-${Math.random()}-${
        profilePicture.name
      }`;
      const imageRef = ref(storage, imageRefName);
      await uploadBytes(imageRef, profilePicture);
      const photoURL = await getDownloadURL(imageRef);
      await updateProfile(auth.currentUser, { displayName, photoURL });
      await updateDoc(userDoc, { photoURL, displayName });
    }
  } catch (error) {
    console.error(error.message);
  }
}

export async function signIn({ email, password }) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error.message);
  }
}

export async function signOutApi() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error.message);
    toast.error(error.messsage);
  }
}

export async function resetPassword({ email }) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error(error.message);
  }
}

export async function updatePasswordApi(password) {
  try {
    await updatePassword(auth.currentUser, password);
  } catch (error) {
    console.error(error.message);
  }
}

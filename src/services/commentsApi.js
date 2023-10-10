import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

export async function addComment({ postId, comment }) {
  try {
    const commentsRef = collection(db, `posts/${postId}/comments`);
    addDoc(commentsRef, comment);
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function deleteComment({ postId, commentId }) {
  try {
    const commentDoc = doc(db, `posts/${postId}/comments`, commentId);
    deleteDoc(commentDoc);
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function updateCommentApi({ postId, commentId, updatedComment }) {
  try {
    const commentDoc = doc(db, `posts/${postId}/comments`, commentId);
    updateDoc(commentDoc, updatedComment);
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

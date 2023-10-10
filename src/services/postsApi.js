import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from './firebase';

const postsCollectionRef = collection(db, 'posts');
export async function getPosts({ searchQuery }) {
  try {
    const q = !searchQuery.length
      ? postsCollectionRef
      : query(
          postsCollectionRef,
          where('content', '>=', searchQuery),
          where('content', '<=', searchQuery + '\uf8ff')
        );
    const postsSnapshot = await getDocs(q);
    const posts = await Promise.all(
      postsSnapshot.docs.map(async (postDoc) => {
        const post = { ...postDoc.data(), id: postDoc.id };
        const userCollection = collection(db, 'users');
        const userCollectionRef = doc(userCollection, post.createdBy);
        const userSnapshot = await getDoc(userCollectionRef);
        const user = { ...userSnapshot.data() };
        const commentsCollectionRef = collection(
          db,
          `posts/${post.id}/comments`
        );
        const commentsSnapshot = await getDocs(commentsCollectionRef);
        const comments = await Promise.all(
          commentsSnapshot.docs.map(async (commentDoc) => {
            const comment = { ...commentDoc.data(), id: commentDoc.id };
            const commentUserCollectionRef = doc(
              userCollection,
              comment.createdBy
            );
            const commentUserSnapshot = await getDoc(commentUserCollectionRef);
            return { ...comment, user: { ...commentUserSnapshot.data() } };
          })
        );
        const finalDocument = { ...post, user, comments: [...comments] };
        return finalDocument;
      })
    );
    return posts; //This should return an array with all the documents you have with the nested collection as an array of documents. You can also get other nested collections if you want
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function createPost(data) {
  try {
    addDoc(postsCollectionRef, data);
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function deletePost(id) {
  try {
    const documentDoc = doc(db, 'posts', id);
    deleteDoc(documentDoc);
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function updatePostApi({ postId, updatedPost }) {
  try {
    const postDoc = doc(db, 'posts', postId);
    updateDoc(postDoc, updatedPost);
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function updateLikedBy({ postId, likedBy }) {
  try {
    const postDoc = doc(db, 'posts', postId);
    updateDoc(postDoc, { likedBy: [...likedBy, auth?.currentUser?.uid] });
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function updateDislikedBy({ postId, dislikedBy }) {
  try {
    const postDoc = doc(db, 'posts', postId);
    updateDoc(postDoc, { dislikedBy: [...dislikedBy, auth?.currentUser?.uid] });
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

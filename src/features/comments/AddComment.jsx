/* eslint-disable jsx-a11y/img-redundant-alt */
import styled from 'styled-components';
import { useAuth } from '../../context/AuthProvider';
import { useForm } from 'react-hook-form';
import { serverTimestamp } from 'firebase/firestore';
import { useNewComment } from './useNewComment';

const AddCommentForm = styled.form`
  width: 100%;
  background-color: var(--mid-terkoiz);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 7px 7px;
  padding: 9px 25px 9px 59px;
  gap: 19px;
  margin-bottom: 17px;
  & > input {
    display: block;
    border: none;
    padding: 7px 16px;
    flex: 1;
    border-radius: 4px;
    font-size: 16px;
    @media (max-width: 540px) {
      width: 100%;
    }
    &:focus,
    &:active {
      border: none;
      outline: none;
    }
    &::placeholder {
      color: var(--placeholder-gray);
    }
  }
`;
const Pic = styled.div`
  width: 44px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  @media (max-width: 540px) {
    width: 40px;
  }
`;
function AddComment({ commentRef, postId }) {
  const { register, handleSubmit, reset } = useForm();
  const { currentUser } = useAuth();
  const { createComment } = useNewComment();
  function onSubmit({ commentContent }) {
    if (!commentContent.length) return;
    const comment = {
      content: commentContent,
      score: 0,
      createdAt: serverTimestamp(),
      likedBy: [],
      dislikedBy: [],
      createdBy: currentUser.uid,
    };
    createComment(
      { comment, postId },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <AddCommentForm onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Pic
        role="img"
        src={currentUser?.photoURL}
        alt="Your profile picture"
      ></Pic>
      <input
        ref={commentRef}
        type="text"
        placeholder="Add a comment..."
        id="commentContent"
        name="commentContent"
        {...register('commentContent')}
      />
    </AddCommentForm>
  );
}

export default AddComment;

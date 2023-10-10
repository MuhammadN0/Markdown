/* eslint-disable jsx-a11y/img-redundant-alt */
import { HiMiniPencil, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';
import CommentLikeDislike from './CommentLikeDislike';
import { useAuth } from '../../context/AuthProvider';
import { useRemoveComment } from './useRemoveComment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateComment } from './useUpdateComment';
import { differenceInDays } from 'date-fns';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  @media (max-width: 540px) {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
`;
const PersonalInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  & > div {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
      max-width: 100%;
      height: 100%;
    }
  }
  & > span {
    font-size: 16px;
    font-weight: 700;
  }
`;
const DateAndActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const DateDiv = styled.span`
  font-size: 14px;
  color: var(--text-gray);
`;
const Button = styled.button`
  border-radius: 3px;
  margin-left: 10px;
  padding: 5px 10px;
  background-color: var(--dark-terkoiz);
  color: var(--white);
  transition: 0.3s;
  & > svg {
    color: var(--white);
    margin-right: 5px;
  }
  &:hover {
    background-color: var(--darker-terkoiz);
  }
`;
const HorizontalRow = styled.div`
  display: flex;
  gap: 21px;
  & > .fit {
    flex: 1;
  }
`;
const Content = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  & > button {
    align-self: flex-end;
    margin-bottom: 12px;
    padding: 5px 10px;
    background-color: var(--dark-terkoiz);
    transition: 0.3s;
    color: var(--white);
    border-radius: 4px;
    &:hover {
      background-color: var(--darker-terkoiz);
    }
  }
`;
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 5px 10px;
  border: none;
  margin-bottom: 5px;
`;

function Comment({ comment, postId }) {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { currentUser } = useAuth();
  const { removeComment } = useRemoveComment();
  const { updateComment } = useUpdateComment();
  const {
    content,
    createdAt,
    id,
    likedBy,
    dislikedBy,
    score,
    user: { displayName, uid, photoURL },
  } = comment;
  const timestampMilliseconds = isNaN(
    createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1e6
  )
    ? Date.now()
    : createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1e6;
  const date = new Date(timestampMilliseconds);
  const dateDiff = differenceInDays(new Date(), date);

  function onSubmit({ updatedComment }) {
    if (updatedComment === content) {
      setIsEditing(false);
      return;
    }
    updateComment(
      { postId, commentId: id, updatedComment: { content: updatedComment } },
      {
        onSettled: () => setIsEditing(false),
      }
    );
  }
  return (
    <HorizontalRow>
      <CommentLikeDislike
        postId={postId}
        score={score}
        likedBy={likedBy}
        dislikedBy={dislikedBy}
        commentId={id}
      />
      <div className="fit">
        <PostHeader>
          <PersonalInformation>
            <div>
              <img src={photoURL} alt={`${displayName}'s Profile picture`} />
            </div>
            <span>{displayName}</span>
          </PersonalInformation>
          <DateAndActions>
            {currentUser?.uid === uid && (
              <Modal>
                <div>
                  <Button
                    onClick={() => {
                      setIsEditing((editing) => !editing);
                      reset();
                    }}
                  >
                    <HiMiniPencil />
                    <span>Edit</span>
                  </Button>
                  <Modal.Button name="confirmComment">
                    <Button
                      onClick={() => removeComment({ commentId: id, postId })}
                    >
                      <HiTrash />
                      <span>Delete</span>
                    </Button>
                  </Modal.Button>
                </div>
                <Modal.Window name="confirmComment">
                  <ConfirmDelete
                    item="comment"
                    deleteItem={() => removeComment({ commentId: id, postId })}
                  />
                </Modal.Window>
              </Modal>
            )}
            <DateDiv>
              {dateDiff < 1
                ? 'Today'
                : dateDiff < 7
                ? `${dateDiff} ${dateDiff === 1 ? 'day' : 'days'} ago`
                : dateDiff < 30
                ? `${Math.floor(dateDiff / 7)} ${
                    Math.floor(dateDiff / 7) === 1 ? 'week' : 'weeks'
                  } Ago`
                : dateDiff < 365
                ? `${Math.floor(dateDiff / 30)}  ${
                    Math.floor(dateDiff / 30) === 1 ? 'month' : 'months'
                  } ago`
                : `${Math.floor(dateDiff / 365)}  ${
                    Math.floor(dateDiff / 365) === 1 ? 'year' : 'years'
                  } years ago`}
            </DateDiv>
          </DateAndActions>
        </PostHeader>
        {!isEditing ? (
          <Content>{content}</Content>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              defaultValue={content}
              type="text"
              name="updatedComment"
              id="updatedComment"
              {...register('updatedComment')}
            />
          </Form>
        )}
      </div>
    </HorizontalRow>
  );
}

export default Comment;

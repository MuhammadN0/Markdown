/* eslint-disable jsx-a11y/img-redundant-alt */
import styled from 'styled-components';
import { HiMiniPencil, HiTrash } from 'react-icons/hi2';
import PostLikeDislike from './PostLikeDislike';
import Comments from '../comments/Comments';
import AddComment from '../comments/AddComment';
import { useAuth } from '../../context/AuthProvider';
import { useDeletePost } from './useDeletePost';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePost } from './useUpdatePost';
import { differenceInDays } from 'date-fns';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Spinner from '../../ui/Spinner';
const StyledPost = styled.div`
  padding: 24px 59px 8px;
  background-color: var(--light-terkoiz);
  border-radius: 7px 7px 0 0;
  @media (max-width: 540px) {
    padding: 15px;
  }
`;
const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  @media (max-width: 540px) {
    flex-direction: column;
    gap: 15px;
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
const Content = styled.p`
  /* Textarea  */
  /* display: block;
  width: 100%;
  border: none;
  background-color: transparent;
  color: var(--black);
  font-size: 16px;
  resize: vertical;
  height: auto; */
  font-size: 16px;
  margin-bottom: 23px;
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
const Img = styled.div`
  width: 44px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
`;
function Post({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const commentRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();
  const { updatePost, isLoading: isUpdating } = useUpdatePost();
  const { deletePost, isLoading: isDeleting } = useDeletePost();
  const { currentUser } = useAuth();
  const {
    content,
    score,
    id,
    likedBy,
    dislikedBy,
    createdAt,
    comments,
    user: { displayName, uid, photoURL },
  } = post;
  const timestampMilliseconds = isNaN(
    createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1e6
  )
    ? Date.now()
    : createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1e6;
  const date = new Date(timestampMilliseconds);
  const dateDiff = differenceInDays(new Date(), date);
  function onSubmit({ updatedContent }) {
    if (updatedContent === content) {
      setIsEditing(false);
      return;
    }
    updatePost(
      { postId: id, updatedPost: { content: updatedContent } },
      {
        onSettled: () => setIsEditing(false),
      }
    );
  }
  if (isDeleting || isUpdating) return <Spinner />;
  return (
    <>
      <StyledPost>
        <PostHeader>
          <PersonalInformation>
            <Img src={photoURL}></Img>
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
                  <Modal.Button name="confirmDelete">
                    <Button>
                      <HiTrash />
                      <span>Delete</span>
                    </Button>
                  </Modal.Button>
                </div>
                <Modal.Window name="confirmDelete">
                  <ConfirmDelete
                    item="post"
                    deleteItem={() => deletePost(id)}
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
        {isEditing ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              defaultValue={content}
              type="text"
              name="updateContent"
              id="updatedContent"
              {...register('updatedContent')}
            />
            <button>Submit</button>
          </Form>
        ) : (
          <Content>{content}</Content>
        )}
        <PostLikeDislike
          dislikedBy={dislikedBy}
          likedBy={likedBy}
          postId={id}
          commentRef={commentRef}
          score={score}
        />
        <Comments comments={comments} postId={id} />
      </StyledPost>
      <AddComment postId={id} commentRef={commentRef} />
    </>
  );
}

export default Post;

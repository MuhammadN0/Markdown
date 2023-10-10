/* eslint-disable jsx-a11y/img-redundant-alt */
import { styled } from 'styled-components';
import { useAuth } from '../../context/AuthProvider';
import { useForm } from 'react-hook-form';
import { serverTimestamp } from 'firebase/firestore';
import { useNewPost } from './useNewPost';
import Spinner from '../../ui/Spinner';
const Form = styled.form`
  background-color: var(--mid-terkoiz);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 21px 34px;
  border-radius: 7px;
  margin-bottom: 17px;
  gap: 20px;
  @media (max-width: 540px) {
    flex-direction: column;
    gap: 10px;
    position: relative;
    padding-left: 50px;
  }
  & > button {
    background-color: var(--dark-terkoiz);
    padding: 5px 10px;
    border-radius: 4px;
    color: var(--white);
    transition: 300ms;
    @media (max-width: 540px) {
      align-self: flex-end;
    }
    &:hover {
      background-color: var(--darker-terkoiz);
    }
  }
`;

const Textarea = styled.textarea`
  resize: none;
  border: none;
  flex: 1;
  height: 102px;
  border-radius: 5px;
  font-size: 16px;
  padding: 17px;
  font-family: 'Poppins', sans-serif;
  @media (max-width: 540px) {
    width: 100%;
  }
  &::placeholder {
    color: #898989;
    font-size: 16px;
  }
  &:focus,
  &:active {
    outline: none;
    border: none;
  }
`;
const Img = styled.div`
  width: 66px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  @media (max-width: 540px) {
    width: 30px;
    position: absolute;
    top: 21px;
    left: 12px;
  }
`;
function NewPostForm() {
  const { register, handleSubmit, reset } = useForm();
  const { createNewPost, isLoading } = useNewPost();
  const { currentUser } = useAuth();
  function onSubmit({ newPost }) {
    if (!newPost.length) return;
    const data = {
      content: newPost,
      score: 0,
      createdAt: serverTimestamp(),
      likedBy: [],
      dislikedBy: [],
      createdBy: currentUser.uid,
    };
    createNewPost(data, {
      onSettled: () => reset(),
    });
  }
  if (isLoading) return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Img
        role="image"
        src={currentUser?.photoURL}
        alt="your profile picture"
      ></Img>
      <Textarea
        name="newPost"
        id="newPost"
        {...register('newPost', {
          required: true,
        })}
        placeholder={`What's on your mind, ${currentUser?.displayName}?`}
        role="input"
      />
      <button>Submit</button>
    </Form>
  );
}

export default NewPostForm;

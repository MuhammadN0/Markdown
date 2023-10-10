import {
  HiChatBubbleOvalLeft,
  HiChevronDown,
  HiChevronUp,
} from 'react-icons/hi2';
import styled from 'styled-components';
import { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { useUpdatePost } from './useUpdatePost';
const Hr = styled.hr`
  height: 3px;
  border: none;
  background-color: var(--dark-terkoiz);
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  position: relative;
  &::after {
    content: '';
    width: 3px;
    height: 31px;
    background-color: var(--dark-terkoiz);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const LikeDislike = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  & span {
    color: var(--dark-terkoiz);
    font-size: 28px;
  }
  & button {
    background-color: transparent;
    & svg {
      color: var(--dark-terkoiz);
    }
  }
`;
const CommentDiv = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  & button {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    border-radius: 4px;
    background-color: transparent;
    color: var(--dark-terkoiz);
    transition: 0.3s;
    &:hover {
      background-color: var(--mid-terkoiz);
    }
  }
`;

function PostLikeDislike({ score, commentRef, likedBy, postId, dislikedBy }) {
  const { currentUser } = useAuth();
  const [plusIsTriggered, setPlusIsTriggered] = useState(
    likedBy?.includes(currentUser?.uid)
  );
  const [minusIsTriggered, setMinusIsTriggered] = useState(
    dislikedBy?.includes(currentUser?.uid)
  );
  const [count, setCount] = useState(Number(score));
  const { updatePost } = useUpdatePost();

  function handlePlus() {
    minusIsTriggered ? setMinusIsTriggered(false) : setPlusIsTriggered(true);
    setCount((count) => count + 1);
    if (!plusIsTriggered && !minusIsTriggered) {
      const newData = {
        score: count + 1,
        likedBy: [...likedBy, currentUser?.uid],
        dislikedBy: dislikedBy.filter((userId) => userId !== currentUser?.uid),
      };
      updatePost({ postId, updatedPost: newData });
    } else {
      const newData = {
        score: count + 1,
        likedBy: likedBy.filter((userId) => userId !== currentUser?.uid),
        dislikedBy: dislikedBy.filter((userId) => userId !== currentUser?.uid),
      };
      updatePost({ postId, updatedPost: newData });
    }
  }

  function handleMinus() {
    plusIsTriggered ? setPlusIsTriggered(false) : setMinusIsTriggered(true);
    setCount((count) => count - 1);
    if (!plusIsTriggered && !minusIsTriggered) {
      const newData = {
        score: count - 1,
        likedBy: likedBy.filter((userid) => userid !== currentUser?.uid),
        dislikedBy: [...dislikedBy, currentUser?.uid],
      };
      updatePost({ postId, updatedPost: newData });
    } else {
      const newData = {
        score: count - 1,
        likedBy: likedBy.filter((userid) => userid !== currentUser?.uid),
        dislikedBy: dislikedBy.filter((userid) => userid !== currentUser?.uid),
      };
      updatePost({ postId, updatedPost: newData });
    }
  }

  return (
    <>
      <Hr />
      <Container>
        <LikeDislike>
          <button onClick={() => handlePlus()} disabled={plusIsTriggered}>
            <HiChevronUp size={30} />
          </button>
          <span>{score}</span>
          <button onClick={() => handleMinus()} disabled={minusIsTriggered}>
            <HiChevronDown size={30} />
          </button>
        </LikeDislike>
        <CommentDiv>
          <button>
            <HiChatBubbleOvalLeft size={25} />
            <span>Comment</span>
          </button>
        </CommentDiv>
      </Container>
      <Hr style={{ marginBottom: '10px' }} />
    </>
  );
}

export default PostLikeDislike;

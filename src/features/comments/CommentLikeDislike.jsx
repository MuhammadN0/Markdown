import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthProvider';
import { useState } from 'react';
import { useUpdateComment } from './useUpdateComment';
const LikeDislike = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & button {
    background-color: transparent;
    color: var(--dark-terkoiz);
  }
  & span {
    color: var(--dark-terkoiz);
  }
`;
function CommentLikeDislike({ score, postId, commentId, likedBy, dislikedBy }) {
  const { currentUser } = useAuth();
  const [plusIsTriggered, setPlusIsTriggered] = useState(
    likedBy?.includes(currentUser?.uid)
  );
  const [minusIsTriggered, setMinusIsTriggered] = useState(
    dislikedBy?.includes(currentUser?.uid)
  );
  const [count, setCount] = useState(Number(score));
  const { updateComment } = useUpdateComment();

  function handlePlus() {
    minusIsTriggered ? setMinusIsTriggered(false) : setPlusIsTriggered(true);
    setCount((count) => count + 1);
    if (!plusIsTriggered && !minusIsTriggered) {
      const newData = {
        score: count + 1,
        likedBy: likedBy ? [...likedBy, currentUser?.uid] : [currentUser?.uid],
        dislikedBy: dislikedBy
          ? dislikedBy.filter((userId) => userId !== currentUser?.uid)
          : [],
      };
      updateComment({ postId, commentId, updatedComment: newData });
    } else {
      const newData = {
        score: count + 1,
        likedBy: likedBy
          ? likedBy.filter((userId) => userId !== currentUser?.uid)
          : [],
        dislikedBy: dislikedBy
          ? dislikedBy.filter((userId) => userId !== currentUser?.uid)
          : [],
      };
      updateComment({ postId, commentId, updatedComment: newData });
    }
  }

  function handleMinus() {
    plusIsTriggered ? setPlusIsTriggered(false) : setMinusIsTriggered(true);
    setCount((count) => count - 1);
    if (!plusIsTriggered && !minusIsTriggered) {
      const newData = {
        score: count - 1,
        likedBy: likedBy
          ? likedBy.filter((userid) => userid !== currentUser?.uid)
          : [],
        dislikedBy: dislikedBy
          ? [...dislikedBy, currentUser?.uid]
          : [currentUser?.uid],
      };
      updateComment({ postId, commentId, updatedComment: newData });
    } else {
      const newData = {
        score: count - 1,
        likedBy: likedBy
          ? likedBy.filter((userid) => userid !== currentUser?.uid)
          : [],
        dislikedBy: dislikedBy
          ? dislikedBy.filter((userid) => userid !== currentUser?.uid)
          : [],
      };
      updateComment({ postId, commentId, updatedComment: newData });
    }
  }

  return (
    <LikeDislike>
      <button onClick={() => handlePlus()} disabled={plusIsTriggered}>
        <HiChevronUp size={25} />
      </button>
      <span>{score}</span>
      <button onClick={() => handleMinus()} disabled={minusIsTriggered}>
        <HiChevronDown size={25} />
      </button>
    </LikeDislike>
  );
}

export default CommentLikeDislike;

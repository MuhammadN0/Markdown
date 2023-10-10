import Comment from './Comment';

function Comments({ comments, postId }) {
  return comments.map((comment) => (
    <Comment key={comment.id} comment={comment} postId={postId} />
  ));
}

export default Comments;

import Spinner from '../../ui/Spinner';
import Post from './Post';
import { usePosts } from './usePosts';
function Posts() {
  const { posts, isLoading } = usePosts();
  if (isLoading) return <Spinner />;
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;

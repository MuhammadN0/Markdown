import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../services/postsApi';
import { useSearch } from '../../context/SearchProvider';

export function usePosts() {
  const { searchQuery } = useSearch();
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', searchQuery],
    queryFn: () => getPosts({ searchQuery }),
  });
  return { posts, isLoading };
}

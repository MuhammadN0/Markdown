import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost as deletePostApi } from '../../services/postsApi';
import toast from 'react-hot-toast';
export function useDeletePost() {
  const queryClient = useQueryClient();
  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      toast.success('Successfully deleted post');
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { deletePost, isLoading };
}

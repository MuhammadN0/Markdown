import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../../services/commentsApi';
import toast from 'react-hot-toast';

export function useRemoveComment() {
  const queryClient = useQueryClient();
  const { mutate: removeComment, isLoading } = useMutation({
    mutationFn: ({ postId, commentId }) => deleteComment({ postId, commentId }),
    onSuccess: () => {
      toast.success('Removed comment');
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { removeComment, isLoading };
}

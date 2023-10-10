import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addComment } from '../../services/commentsApi';

export function useNewComment() {
  const queryClient = useQueryClient();
  const { mutate: createComment, isLoading } = useMutation({
    mutationFn: ({ comment, postId }) => addComment({ comment, postId }),
    onSuccess: () => {
      toast.success('Comment added');
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createComment, isLoading };
}

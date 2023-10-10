import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCommentApi } from '../../services/commentsApi';
import toast from 'react-hot-toast';

export function useUpdateComment() {
  const queryClient = useQueryClient();
  const { mutate: updateComment, isLoading } = useMutation({
    mutationFn: ({ postId, commentId, updatedComment }) =>
      updateCommentApi({ postId, commentId, updatedComment }),
    onSuccess: () => {
      toast.success('Updated comment');
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateComment, isLoading };
}

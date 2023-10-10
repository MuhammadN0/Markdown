import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePostApi } from '../../services/postsApi';
import toast from 'react-hot-toast';

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { mutate: updatePost, isLoading } = useMutation({
    mutationFn: ({ updatedPost, postId }) =>
      updatePostApi({ updatedPost, postId }),
    onSuccess: () => {
      toast.success('Post updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updatePost, isLoading };
}

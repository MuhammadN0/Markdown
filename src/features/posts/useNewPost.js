import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../services/postsApi';
import toast from 'react-hot-toast';

export function useNewPost() {
  const queryClient = useQueryClient();
  const { mutate: createNewPost, isLoading } = useMutation({
    mutationFn: (data) => createPost(data),
    onSuccess: () => {
      toast.success('New post created');
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createNewPost, isLoading };
}

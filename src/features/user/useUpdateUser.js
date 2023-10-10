import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserApi } from '../../services/authApi';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ profilePicture, displayName }) =>
      updateUserApi({ displayName, profilePicture }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
      toast.success('Updated successfully');
    },
  });
  return { updateUser, isLoading };
}

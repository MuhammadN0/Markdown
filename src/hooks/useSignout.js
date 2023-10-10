import { useMutation } from '@tanstack/react-query';
import { signOutApi } from '../services/authApi';
import toast from 'react-hot-toast';

export function useSignout() {
  const { mutate: signout, isLoading } = useMutation({
    mutationFn: signOutApi,
    onSuccess: () => toast.success('Signed out successfully'),
    onError: (err) => toast.error(err.message),
  });
  return { signout, isLoading };
}

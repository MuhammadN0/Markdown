import { useMutation } from '@tanstack/react-query';
import { updatePasswordApi } from '../../services/authApi';
import toast from 'react-hot-toast';

export function useUpdatePassword() {
  const { mutate: updatePassword, isLoading } = useMutation({
    mutationFn: (password) => updatePasswordApi(password),
    onSuccess: () => toast.success('Password updated successfully'),
    onError: (err) => toast.error(err.message),
  });
  return { updatePassword, isLoading };
}

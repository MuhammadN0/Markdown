import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../services/authApi';
import toast from 'react-hot-toast';

export function useSendForgotPassword() {
  const { mutate: send, isLoading } = useMutation({
    mutationFn: ({ email }) => resetPassword({ email }),
    onSuccess: () => toast.success('Check your mail 😊'),
  });
  return { send, isLoading };
}

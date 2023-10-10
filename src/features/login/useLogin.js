import { useMutation } from '@tanstack/react-query';
import { signIn } from '../../services/authApi';
import toast from 'react-hot-toast';

export function useLogin() {
  const { mutate: Login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => signIn({ email, password }),
    onSuccess: () => toast.success('Logged in successfully'),
    onError: (err) =>
      toast.error(
        "Couldn't Login, check email and password or you internet connection"
      ),
  });
  return { Login, isLoading };
}

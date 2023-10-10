import { useMutation } from '@tanstack/react-query';
import { signupApi } from '../../services/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useSignUp() {
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password, profilePicture, displayName }) =>
      signupApi({ email, password, profilePicture, displayName }),
    onSuccess: () => {
      toast.success('User successfully created');
      navigate('/');
    },
    onError: (err) => toast.error(err.message),
  });
  return { signup, isLoading };
}

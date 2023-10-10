import styled from 'styled-components';
import { ButtonDiv, Form, FormGroup } from './UpdateUserForm';
import { useForm } from 'react-hook-form';
import { useUpdatePassword } from './useUpdatePassword';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const P = styled.p``;
function UpdatePasswordForm() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    getValues,
    formState: { errors },
    register,
  } = useForm();
  const { updatePassword } = useUpdatePassword();
  function onSubmit({ password }) {
    if (!password.length) {
      toast.error('No password entered');
      toast.error('Did you mean to update profile info?');
      return;
    }
    updatePassword(password, {
      onSettled: () => navigate('/'),
    });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>Update your password</h3>
      <FormGroup>
        <label htmlFor="displayName">Enter your new Password</label>
        <input
          type="password"
          name="password"
          id="password"
          {...register('password')}
        />
        <label htmlFor="displayName">Confirm your Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          {...register('confirmPassword', {
            validate: (value) =>
              getValues().password === value || "Passwords don't match",
          })}
        />
      </FormGroup>
      <ButtonDiv>
        <button>Submit</button>
      </ButtonDiv>
      {errors && (
        <>
          <P>{errors?.confirmPassword?.message}</P>
          <P>{errors?.confirmPassword?.validate?.message}</P>
          <P>{errors?.password?.message}</P>
        </>
      )}
    </Form>
  );
}

export default UpdatePasswordForm;

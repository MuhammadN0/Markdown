import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useSignUp } from './useSignUp';
import Spinner from '../../ui/Spinner';

const Form = styled.form`
  padding: 75px 33px;
  background-color: var(--white-terkoiz);
  border-radius: 20px;
  @media (max-width: 540px) {
    width: 350px;
    padding: 50px 25px;
  }
  & > h2 {
    margin: auto;
    font-size: 26px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 21px;
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 27px;
    margin-bottom: 18px;
    @media (max-width: 540px) {
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }
    & > label {
      font-size: 16px;
      &.custom {
        padding: 6px 21.5px;
        color: var(--white);
        background-color: var(--dark-terkoiz);
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          background-color: var(--darker-terkoiz);
        }
      }
    }
    & input {
      border: 1px solid var(--black);
      padding: 6px 16px;
      border-radius: 999px;
      width: 234px;
      @media (max-width: 540px) {
        width: 250px;
      }
      &::placeholder {
        color: var(--placeholder-gray);
      }
      &[type='file'] {
        display: none;
      }
    }
  }
  & > button {
    display: block;
    margin: auto;
    padding: 10px 32px;
    font-size: 16px;
    color: var(--white);
    background-color: var(--dark-terkoiz);
    border-radius: 999px;
    margin-top: 21px;
    transition: 0.3s;
    &:hover {
      background-color: var(--darker-terkoiz);
    }
  }
  & > a {
    display: block;
    text-align: center;
    color: var(--blue);
    text-decoration: underline;
    margin-top: 15px;
  }
`;
const Error = styled.p`
  text-align: center;
  color: red;
  font-size: 12px;
`;
function SignUpForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { signup, isLoading } = useSignUp();
  function onSubmit(data) {
    const { email, password, displayName } = data;
    signup({
      email,
      password,
      profilePicture: data.profilePicture[0],
      displayName,
    });
  }
  if (isLoading) return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign up</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <div>
          <input
            placeholder="Enter your email"
            id="email"
            name="email"
            type="email"
            {...register('email', {
              required: 'This field is required',
            })}
          />
          <Error>{errors?.email?.message}</Error>
        </div>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <div>
          <input
            placeholder="Enter your password"
            id="password"
            name="password"
            type="password"
            {...register('password', {
              required: 'This field is required',
            })}
          />
          <Error>{errors?.password?.message}</Error>
        </div>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <div>
          <input
            placeholder="Re-enter your password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'This field is required',
              validate: (value) =>
                getValues().password === value || "Passwords don't match",
            })}
          />
          <Error>{errors?.confirmPassword?.message}</Error>
          <Error>{errors?.confirmPassword?.validate?.message}</Error>
        </div>
      </div>
      <div>
        <label htmlFor="displayName">Display name:</label>
        <div>
          <input
            placeholder="Enter your display name"
            id="displayName"
            name="displayName"
            type="text"
            {...register('displayName', {
              required: 'This field is required',
            })}
          />
          <Error>{errors?.displayName?.message}</Error>
        </div>
      </div>
      <div>
        <label htmlFor="profilePicture">Profile Picture</label>
        <label className="custom" htmlFor="profilePicture">
          Choose File
        </label>
        <div>
          <input
            id="profilePicture"
            name="profilePicture"
            type="file"
            {...register('profilePicture', {
              required: 'This field is required',
            })}
          />
          <Error>{errors?.profilePicture?.message}</Error>
        </div>
      </div>
      <button type="submit">Sign up</button>
      <Link to="/login">Already have an account? Click here</Link>
    </Form>
  );
}

export default SignUpForm;

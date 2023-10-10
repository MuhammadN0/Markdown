import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useLogin } from './useLogin';
import Spinner from '../../ui/Spinner';
const Form = styled.form`
  align-self: center;
  background-color: var(--white-terkoiz);
  border-radius: 20px;
  padding: 33px;
  position: relative;
  margin-bottom: 30px;
  & > h2 {
    font-weight: 400;
    font-size: 26px;
    margin-bottom: 31px;
    @media (max-width: 540px) {
      font-size: 24px;
    }
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 27px;
    margin-bottom: 20px;
    @media (max-width: 540px) {
      flex-direction: column;
      gap: 10px;
    }
    & > label {
      font-size: 16px;
    }
    & > input {
      border: 1px solid var(--black);
      padding: 6px 16px;
      border-radius: 999px;
      @media (max-width: 540px) {
        width: 100%;
      }
      &::placeholder {
        color: var(--placeholder-gray);
      }
    }
  }
  & > button {
    display: block;
    padding: 6px 36px;
    font-size: 16px;
    color: var(--white);
    background-color: var(--dark-terkoiz);
    border-radius: 999px;
    margin: auto;
    transition: 0.3s;
    &:hover {
      background-color: var(--darker-terkoiz);
    }
  }
  & > a {
    display: block;
    margin: auto;
    margin-top: 20px;
    text-align: center;
    color: var(--blue);
    text-decoration: underline;
  }
`;
function LogInForm() {
  const { register, handleSubmit } = useForm();
  const { Login, isLoading } = useLogin();
  function onSubmit(data) {
    if (!data.email || !data.password) return;
    Login(data);
  }
  if (isLoading) return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign in to your account</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          placeholder="Enter your email"
          id="email"
          name="email"
          type="email"
          {...register('email', {
            required: true,
          })}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Enter your password"
          id="password"
          name="password"
          type="password"
          {...register('password', {
            required: true,
          })}
        />
      </div>
      <button type="submit">Sign in</button>
      <Link to="/forgotpassword">Forgot your password? Click here.</Link>
    </Form>
  );
}

export default LogInForm;

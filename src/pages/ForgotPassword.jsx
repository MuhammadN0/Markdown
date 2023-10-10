import styled from 'styled-components';
import Navbar from '../ui/Navbar';
import Container from '../ui/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSendForgotPassword } from '../hooks/useSendForgotPassword';
const ForgotContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100dvh - 88.22px);
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;

  & > h2 {
    font-weight: 400;
    margin-bottom: 30px;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    & > input {
      flex: 1;
      padding: 6px;
      font-size: 14px;
      &:focus,
      &:active {
        outline: none;
      }
    }
  }
  & > button {
    background-color: var(--dark-terkoiz);
    transition: 0.3s;
    padding: 10px 15px;
    color: var(--white);
    border-radius: 4px;
    align-self: flex-end;
    margin-bottom: 30px;
    &:hover {
      background-color: var(--darker-terkoiz);
    }
  }
  & > a {
    color: var(--blue);
    text-align: center;
  }
`;
function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const { send } = useSendForgotPassword();
  const navigate = useNavigate();
  function onSubmit({ email }) {
    send(
      { email },
      {
        onSettled: () => navigate('/'),
      }
    );
  }
  return (
    <>
      <Navbar />
      <ForgotContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>Hello, we are sorry to hear that you lost your password</h2>
          <div>
            <label htmlFor="email">Please enter your email</label>
            <input
              type="email"
              id="email"
              name="email"
              {...register('email', { required: true })}
            />
          </div>
          <button>Submit</button>
          <Link to="/signup">You do not have an account? Click here.</Link>
        </Form>
      </ForgotContainer>
    </>
  );
}

export default ForgotPassword;

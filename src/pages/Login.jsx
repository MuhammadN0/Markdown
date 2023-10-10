import Container from '../ui/Container';
import Navbar from '../ui/Navbar';
import LogInForm from '../features/login/LogInForm';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Main = styled.main`
  min-height: calc(100vh - 88px);
  background-color: var(--main-terkoiz);
  @media (max-width: 540px) {
    height: auto;
  }
`;
const LoginContainer = styled(Container)`
  display: flex;
  gap: 52px;
  padding-top: 99px;
  @media (max-width: 540px) {
    flex-direction: column;
    height: auto;
    text-align: center;
  }
  & > div > h2 {
    font-size: 52px;
    font-weight: 400;
    max-width: 601px;
    @media (max-width: 540px) {
      font-size: 34px;
    }
  }
  & > div > p {
    font-size: 20px;
    font-weight: 400;
    color: var(--text-gray);
    margin-bottom: 83px;
    @media (max-width: 540px) {
      font-size: 16px;
      margin-bottom: 30px;
    }
  }
  & > div > button {
    font-size: 18px;
    color: var(--white);
    padding: 15px 37px;
    border-radius: 999px;
    background-color: var(--dark-terkoiz);
    &:hover {
      background-color: var(--darker-terkoiz);
    }
  }
`;

function Login() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Main>
        <LoginContainer>
          <div>
            <h2>Welcome to Markdown, please sign in to continue.</h2>
            <p>Your way into freedom of speech.</p>
            <button onClick={() => navigate('/signup')}>
              Create an account
            </button>
          </div>
          <LogInForm />
        </LoginContainer>
      </Main>
    </>
  );
}

export default Login;

import Container from '../ui/Container';
import Navbar from '../ui/Navbar';
import SignUpForm from '../features/signup/SignUpForm';
import { styled } from 'styled-components';

const Main = styled.main`
  min-height: calc(100vh - 88.4px);
  background-color: var(--main-terkoiz);
  @media (max-width: 540px) {
    padding-top: 30px;
  }
`;
const SignUpContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

function Signup() {
  return (
    <>
      <Navbar />
      <Main>
        <SignUpContainer>
          <SignUpForm />
        </SignUpContainer>
      </Main>
    </>
  );
}

export default Signup;

import NewPostForm from '../features/posts/NewPostForm';
import Posts from '../features/posts/Posts';
import Container from '../ui/Container';
import Navbar from '../ui/Navbar';
import { styled } from 'styled-components';
export const Main = styled.main`
  height: calc(100dvh - 88.4px);
  background-color: var(--main-terkoiz);
  overflow-y: scroll;
  @media (max-width: 540px) {
    height: calc(100dvh - 76.4px);
  }
`;

export const AppContainer = styled(Container)`
  background-color: var(--white);
  min-height: 100%;
  padding: 20px 89px;
  @media (max-width: 540px) {
    padding: 20px 10px;
  }
`;

function AppPage() {
  return (
    <>
      <Navbar />
      <Main>
        <AppContainer>
          <NewPostForm />
          <Posts />
        </AppContainer>
      </Main>
    </>
  );
}

export default AppPage;

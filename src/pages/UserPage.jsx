import { useAuth } from '../context/AuthProvider';
import Navbar from '../ui/Navbar';
import { AppContainer, Main } from './AppPage';
import UpdateUserForm from '../features/user/UpdateUserForm';

function UserPage() {
  const { currentUser } = useAuth();
  return (
    <>
      <Navbar />
      <Main>
        <AppContainer>
          <h2>Hello, {currentUser?.displayName}</h2>
          <UpdateUserForm />
        </AppContainer>
      </Main>
    </>
  );
}

export default UserPage;

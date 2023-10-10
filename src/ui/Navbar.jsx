import { styled } from 'styled-components';
import Container from './Container';
import SearchBar from './SearchBar';
import NotificationIcon from './NotificationIcon';
import { HiArrowLeftOnRectangle, HiUser } from 'react-icons/hi2';
import { useSignout } from '../hooks/useSignout';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
const StyledNav = styled.nav`
  padding-top: 20px;
  padding-bottom: 14px;
  background-color: var(--nav-terkoiz);
  & .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    & button,
    a {
      background-color: transparent;
      color: var(--white);
    }
  }
`;
const Logo = styled.div`
  font-size: 36px;
  color: var(--white);
  @media (max-width: 540px) {
    font-size: 24px;
  }
`;
const NavContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
function Navbar() {
  const { signout } = useSignout();
  const { currentUser } = useAuth();
  return (
    <StyledNav>
      <NavContainer>
        <Link to="/">
          <Logo>Markdown</Logo>
        </Link>
        {currentUser && (
          <>
            <SearchBar />
            <div className="actions">
              {/* <NotificationIcon /> */}
              <Link to="/userpage">
                <HiUser size={20} />
              </Link>
              <button onClick={signout}>
                <HiArrowLeftOnRectangle size={20} />
              </button>
            </div>
          </>
        )}
      </NavContainer>
    </StyledNav>
  );
}

export default Navbar;

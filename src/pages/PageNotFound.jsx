import { styled } from 'styled-components';
const StyledNotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  height: 100vh;
`;
function PageNotFound() {
  return (
    <StyledNotFound>
      Sorry, but the page you requested was not found.
    </StyledNotFound>
  );
}

export default PageNotFound;

import { styled } from 'styled-components';
const Container = styled.div`
  margin: auto;
  width: calc(1440px - 150px - 150px);
  @media (max-width: 540px) {
    width: 350px;
  }
`;
export default Container;

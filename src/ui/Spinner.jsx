import { createPortal } from 'react-dom';
import styled from 'styled-components';

const StyledSpinner = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
function Spinner() {
  return createPortal(
    <Overlay>
      <StyledSpinner></StyledSpinner>
    </Overlay>,
    document.body
  );
}

export default Spinner;

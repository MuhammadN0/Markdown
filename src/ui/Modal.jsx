import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { HiXMark } from 'react-icons/hi2';
import { useCloseModal } from '../hooks/useCloseModal';
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalWindow = styled.div`
  background-color: white;
  position: relative;
  border-radius: 7px;
  padding: 30px 40px;
  & > button {
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    border: none;
    padding: 3px;
  }
`;

const ModalContext = createContext();
function Modal({ children }) {
  const [openWindow, setOpenWindow] = useState('');
  const close = () => setOpenWindow('');
  return (
    <ModalContext.Provider value={{ openWindow, setOpenWindow, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Button({ children, name }) {
  const { setOpenWindow } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => setOpenWindow(name) });
}

function Window({ name, children }) {
  const { close, openWindow } = useContext(ModalContext);
  const ref = useCloseModal(close);
  if (name !== openWindow) return null;
  return createPortal(
    <Overlay>
      <ModalWindow ref={ref}>
        <button onClick={close}>
          <HiXMark size={25} />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </ModalWindow>
    </Overlay>,
    document.body
  );
}

Modal.Window = Window;
Modal.Button = Button;

export default Modal;

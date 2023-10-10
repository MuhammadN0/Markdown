import styled from 'styled-components';

const ConfirmDeleteDiv = styled.div`
  display: flex;
  flex-direction: column;
  & h2 {
    margin-bottom: 5px;
  }
  & p {
    margin-bottom: 15px;
  }
  & > div {
    align-self: flex-end;
    display: flex;
    gap: 15px;
    & > button {
      padding: 10px 15px;
      color: white;
      background-color: var(--dark-terkoiz);
      border-radius: 4px;
      &.delete {
        background-color: var(--darker-terkoiz);
      }
    }
  }
`;
function ConfirmDelete({ item, onCloseModal, deleteItem }) {
  return (
    <ConfirmDeleteDiv>
      <h2>Are you sure you want to delete this {item}?</h2>
      <p>Once you delete it there is no going back</p>
      <div>
        <button onClick={onCloseModal}>Cancel</button>
        <button className="delete" onClick={deleteItem}>
          Delete
        </button>
      </div>
    </ConfirmDeleteDiv>
  );
}

export default ConfirmDelete;

import { HiMagnifyingGlass } from 'react-icons/hi2';
import { styled } from 'styled-components';
import { useSearch } from '../context/SearchProvider';
const StyledSearchBar = styled.div`
  width: 398px;
  position: relative;
  @media (max-width: 540px) {
    width: 100px;
  }
  & > svg {
    position: absolute;
    color: var(--placeholder-gray);
    top: 0;
    transform: translateY(36%);
    left: 20px;
  }
  & input {
    width: 100%;
    padding: 12px;
    padding-left: 57px;
    border-radius: 999px;
    border: none;
    font-size: 16px;
    &::placeholder {
      font-size: 16px;
      color: var(--placeholder-gray);
      @media (max-width: 540px) {
        color: transparent;
      }
    }
    &:focus {
      border: none;
      outline: none;
    }
    &:active {
      border: none;
      outline: none;
    }
  }
`;
function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearch();
  return (
    <StyledSearchBar>
      <HiMagnifyingGlass size={25} />
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </StyledSearchBar>
  );
}

export default SearchBar;

import { Search as SearchIcon } from 'react-feather';
import styled from 'styled-components';

export const Icon = styled(SearchIcon)`
  color: #fff;
  position: absolute;
  top: 25px;
`;

export const Search = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  outline: none;
  padding: 8px 0 8px 32px;
  width: calc(100% - 32px);
`;
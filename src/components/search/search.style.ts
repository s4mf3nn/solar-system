import { Search as SearchIcon } from 'react-feather';
import styled from 'styled-components';

export const Icon = styled(SearchIcon)`
  color: #fff;
  position: absolute;
  margin-top: 8px;
`;

export const Search = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  border-radius: 0;
  color: #fff;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  margin: 0;
  padding: 8px 0 10px 32px;
  width: calc(100% - 32px);
`;
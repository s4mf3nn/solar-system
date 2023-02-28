import { FC } from 'react';
import * as sc from './search.style';

interface SearchProps {
  placeholder: string;
}

export const Search: FC<SearchProps> = ({ placeholder }) => {
  return (
    <>
      <sc.Icon />
      <sc.Search
        type="text"
        name="search"
        placeholder={placeholder}
      />
    </>
  );
};
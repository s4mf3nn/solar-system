import { FC } from 'react';
import * as sc from './search.style';

interface SearchProps {
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const Search: FC<SearchProps> = ({ placeholder, handleChange, value }) => {
  return (
    <>
      <sc.Icon />
      <sc.Search
        type="text"
        name="search"
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    </>
  );
};
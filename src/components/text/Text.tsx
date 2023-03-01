import { FC } from 'react';
import * as sc from './text.style';

interface TextProps {
  color: string;
  bold?: boolean;
  ellipsis?: boolean;
  children: string;
}

export const Text: FC<TextProps> = ({ color, bold, ellipsis, children }) => {
  return (
    <sc.Text color={color} ellipsis={ellipsis} bold={bold || false}>{children}</sc.Text>
  );
};
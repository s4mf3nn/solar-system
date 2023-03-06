import { FC } from 'react';
import * as sc from './text.style';

interface TextProps {
  color: string;
  bold?: boolean;
  ellipsis?: boolean;
  paragraph?: boolean;
  children: string;
}

export const Text: FC<TextProps> = ({ color, bold, ellipsis, paragraph, children }) => {
  return (
    <sc.Text color={color} ellipsis={ellipsis} paragraph={paragraph} bold={bold || false}>{children}</sc.Text>
  );
};
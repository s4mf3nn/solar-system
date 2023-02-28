import { FC } from 'react';
import * as sc from './heading.style';

interface HeadingProps {
  type: 'h1' | 'h2';
  color: string;
  children: string;
}

export const Heading: FC<HeadingProps> = ({ type, color, children }) => {
  if (type === "h1") {
    return (
      <sc.Heading1 color={color} >{children}</sc.Heading1>
    );
  }
  return (
    <sc.Heading2 color={color} >{children}</sc.Heading2>
  );
};
import { FC } from 'react';
import * as sc from './heading.style';

interface HeadingProps {
  type: 'h1' | 'h2' | 'h3';
  color: string;
  capitalize?: boolean;
  children: string;
}

export const Heading: FC<HeadingProps> = ({ type, color, capitalize, children }) => {
  if (type === "h1") {
    return (
      <sc.Heading1 color={color} capitalize={capitalize}>{children}</sc.Heading1>
    );
  } else if (type === "h2") {
    return (
      <sc.Heading2 color={color} capitalize={capitalize}>{children}</sc.Heading2>
    );
  }

  return (
    <sc.Heading3 color={color} capitalize={capitalize}>{children}</sc.Heading3>
  );
};
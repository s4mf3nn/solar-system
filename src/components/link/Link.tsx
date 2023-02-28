import { FC } from "react";
import { ArrowRight } from 'react-feather';
import * as sc from './link.style';

interface LinkProps {
  to: string;
  label: string;
}
export const Link: FC<LinkProps> = ({ to, label }) => {
  return (
    <sc.LinkTo href={to}>
      {label}
      <ArrowRight />
    </sc.LinkTo>
  );
};
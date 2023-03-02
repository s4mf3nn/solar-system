import { FC } from "react";
import * as sc from './close.style';

interface CloseProps {
  color: string;
  handleClick: () => void;
}

export const Close: FC<CloseProps> = ({ color, handleClick }) => {
  return (
    <sc.Btn onClick={handleClick} color={color} aria-label="Close">
      <sc.CloseIcon color={color} />
    </sc.Btn>
  );
};
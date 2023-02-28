import { FC } from "react";
import * as sc from './button.style';

interface ButtonProps {
  color: string;
  label: string;
}
export const Button: FC<ButtonProps> = ({ color, label }) => {
  return (
    <sc.Btn color={color} >{label}</sc.Btn>
  );
};
import { FC } from "react";
import * as sc from './close.style';

export const Close: FC = () => {
  return (
    <sc.Btn>
      <sc.CloseIcon />
    </sc.Btn>
  );
};
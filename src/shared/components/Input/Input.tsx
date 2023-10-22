import { forwardRef } from "react";
import { TextFieldProps } from "@mui/material";
import { InputStyled } from "./styles";

const Input = forwardRef<HTMLInputElement, TextFieldProps>(function Component(
  { ...rest },
  ref
) {
  return <InputStyled {...rest} ref={ref} />;
});

export default Input;

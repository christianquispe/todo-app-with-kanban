import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const InputStyled = styled(TextField)`
  border: none;
  padding: 0.8rem;
  width: 100%;
  border-radius: 6px;
  &.clean {
    background-color: initial;
    &:focus-visible {
      border: none;
      outline: none;
    }
    &:hover {
      background-color: #fff;
      transition: 0.3s;
    }
  }
`;

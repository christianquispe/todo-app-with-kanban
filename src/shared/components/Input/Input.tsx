import { forwardRef } from "react";
import "./styles.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "clean" | "default";
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Component(
  { className, variant = "default", ...rest },
  ref
) {
  const classes = `Input ${variant || ""} ${className || ""}`;
  return <input className={classes} type="text" {...rest} ref={ref} />;
});

export default Input;

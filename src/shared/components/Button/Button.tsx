import "./styles.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "default";
}

export default function Input({
  className,
  variant = "default",
  children,
  ...rest
}: ButtonProps) {
  const classes = `Button ${variant || ""} ${className || ""}`;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

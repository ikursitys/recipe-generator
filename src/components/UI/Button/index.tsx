import classes from "./Button.module.css";

interface ButtonProps {
  children: string;
  type?: "button" | "submit";
  handleClick?: () => void;
  disabled?: boolean;
}

const Button = ({ children, disabled, type, handleClick }: ButtonProps) => {
  return (
    <button
      className={`${classes.button} ${disabled ? classes.disabled : ""}`}
      type={type}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;

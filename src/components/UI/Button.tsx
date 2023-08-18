import classes from "./Button.module.css";

interface Button {
  children: string;
  type?: "button" | "submit";
  handleClick?: () => void;
  disabled?: boolean;
}

const Button = ({ children, disabled, type, handleClick }: Button) => {
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

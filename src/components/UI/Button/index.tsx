import classes from "./Button.module.css";

const Button = ({
  children,
  disabled,
  type,
  onClick,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`${classes.button} ${disabled ? classes.disabled : ""}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };

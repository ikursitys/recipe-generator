import { ReactNode } from "react";
import classes from "./Modal.module.css";

const Modal = ({
  isVisible,
  children,
  onClose,
}: {
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
}) => {
  if (!isVisible) return null;

  return (
    <div className={classes.container} onClick={onClose}>
      <div className={classes.overlay}>{children}</div>
    </div>
  );
};

export default Modal;

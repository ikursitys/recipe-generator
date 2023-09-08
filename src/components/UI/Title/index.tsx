import { ReactNode } from "react";
import classes from "./Title.module.css";

const Title = ({ children }: { children: ReactNode }) => {
  return <div className={classes.title}>{children}</div>;
};

export { Title };

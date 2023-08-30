import { ReactNode } from "react";
import classes from "./Card.module.css";

const Card = ({
  children,
  type,
}: {
  children: ReactNode;
  type: "card" | "recipe";
}) => {
  return (
    <div className={type === "card" ? classes.card : classes.recipe}>
      {children}
    </div>
  );
};

export default Card;

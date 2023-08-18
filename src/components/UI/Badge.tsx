"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import classes from "./Badge.module.css";

interface BadgeProps {
  type: "radio" | "checkbox";
  value: string;
  name: string;
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Badge = (props: BadgeProps) => {
  return (
    <div className={classes.badge}>
      <input
        onChange={props.onSelect}
        id={props.value}
        value={props.value}
        type={props.type}
        name={props.name}
      />
      <label htmlFor={props.value}>{props.value}</label>
    </div>
  );
};

export default Badge;

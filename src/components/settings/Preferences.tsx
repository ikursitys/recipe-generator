"use client";
import { useRequestContext } from "../../context/requestContext";
import { useCompletion } from "ai/react";
import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import { useRecipeContext } from "../../context/recipeContext";
import { convertRecipe } from "../../utils/recipeConverter";
import Title from "../UI/Title";

import classes from "./Preferences.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";

const Preferences = () => {
  const { restrictions, setPreferences } = useRequestContext();

  const prefRef = useRef<HTMLInputElement>(null);

  const setPrefHandler = () => {
    const enteredText = prefRef.current!.value;
    setPreferences(enteredText);
  };

  return (
    <section className={classes.preferences}>
      <Title>
        <h1>
          Enter additional <span>preferences</span>
        </h1>
      </Title>

      {restrictions.length !== 0 && (
        <h3>Your dietary restrictions: {restrictions.join(", ")}</h3>
      )}
      <input
        type="text"
        id="preferences"
        name="preferences"
        ref={prefRef}
        placeholder="e.g. boiled, crispy, etc."
        onChange={setPrefHandler}
      />
      <div className={classes.buttons}>
        <Link href="/restrictions">
          <Button>Back</Button>
        </Link>

        <Link href="/recipe">
          <Button>Generate</Button>
        </Link>
      </div>
    </section>
  );
};

export default Preferences;

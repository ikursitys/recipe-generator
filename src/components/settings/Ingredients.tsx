"use client";

import { useRequestContext } from "../../context/requestContext";
import Link from "next/link";
import { useRef } from "react";
import Button from "../UI/Button";

import classes from "./Ingredients.module.css";
import Title from "../UI/Title";

const IngredientsSelection = () => {
  const { meal, ingredients, setIngredients } = useRequestContext();
  const ingredientsRef = useRef<HTMLInputElement>(null);

  const ingredientsHandler = () => {
    const enteredText = ingredientsRef.current!.value;
    console.log(enteredText);

    const ingredientsArray = enteredText.split(",").map((el) => el.trim());
    console.log(ingredientsArray);

    setIngredients(ingredientsArray);
  };

  return (
    <section className={classes.ingredients}>
      <Title>
        <h1>
          Enter <span>ingredients</span> for your {meal}
        </h1>
        <p>(separate by , )</p>
      </Title>

      <input
        type="text"
        id="ingredients"
        name="ingredients"
        ref={ingredientsRef}
        placeholder="e.g. chicken, rice, eggs"
      />

      <div className={classes.buttons}>
        <Link href="/meal">
          <Button>Back</Button>
        </Link>
        <Link onClick={ingredientsHandler} href="/restrictions">
          <Button>Next</Button>
        </Link>
      </div>
    </section>
  );
};

export default IngredientsSelection;

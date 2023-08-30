"use client";

import Badge from "../UI/Badge/Badge";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { useRequestContext } from "../../context/requestContext";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import Title from "../UI/Title";

import classes from "./Meal.module.css";
import Image from "next/image";
import breakfast from "../../app/img/breakfast.svg";
import lunch from "../../app/img/lunch.svg";
import dinner from "../../app/img/dinner.svg";
import snack from "../../app/img/snack.svg";
import { useRouter } from "next/navigation";

const MealSelection = () => {
  const { meal, setMeal } = useRequestContext();

  const [enteredMeal, setEnteredMeal] = useState<string>("");

  const [disabled, setDisabled] = useState<boolean>(true);
  const router = useRouter();

  const changeMealHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    setEnteredMeal(value);
    setDisabled(false);
  };

  const setMealHandler = () => {
    if (!enteredMeal) {
      return;
    }
    setMeal(enteredMeal);

    router.push("/ingredients");
  };

  return (
    <section className={classes.meal}>
      <Title>
        <h1>
          Choose your <span>meal</span>
        </h1>
        <p>(meal cannot be empty)</p>
      </Title>

      <div className={classes.meals}>
        <Card type="card">
          <Image className={classes.image} src={breakfast} alt="breakfast" />
          <Badge
            value="breakfast"
            type="radio"
            name="meal"
            onSelect={changeMealHandler}
          />
        </Card>
        <Card type="card">
          <Image className={classes.image} src={lunch} alt="lunch" />
          <Badge
            value="lunch"
            type="radio"
            name="meal"
            onSelect={changeMealHandler}
          />
        </Card>
        <Card type="card">
          <Image className={classes.image} src={dinner} alt="dinner" />
          <Badge
            value="dinner"
            type="radio"
            name="meal"
            onSelect={changeMealHandler}
          />
        </Card>
        <Card type="card">
          <Image className={classes.image} src={snack} alt="snack" />
          <Badge
            value="snack"
            type="radio"
            name="meal"
            onSelect={changeMealHandler}
          />
        </Card>
      </div>

      <div className={classes.button}>
        <Button handleClick={setMealHandler} disabled={disabled}>
          Next
        </Button>
      </div>
    </section>
  );
};

export default MealSelection;

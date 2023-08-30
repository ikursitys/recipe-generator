"use client";

import Badge from "../UI/Badge/Badge";
import Card from "../../components/UI/Card";
import { useRequestContext } from "../../context/requestContext";
import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../UI/Button";
import Title from "../UI/Title";

import classes from "./Restrictions.module.css";
import glutenFree from "../../app/img/gluten-free.svg";
import vegetarian from "../../app/img/vegetarian.svg";
import vegan from "../../app/img/vegan.svg";
import lactoseFree from "../../app/img/lactose-free.svg";

const Restrictions = () => {
  const { ingredients, setRestrictions } = useRequestContext();

  const [checkedRestrictions, setCheckedRestrictions] = useState<[] | string[]>(
    []
  );

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    if (checked) {
      setCheckedRestrictions((prev) => [...prev, value]);
    } else {
      setCheckedRestrictions((prev) => [...prev.filter((el) => el !== value)]);
    }
  };

  const setRestrictionsHandler = () => {
    console.log(checkedRestrictions);
    setRestrictions(checkedRestrictions);
  };

  return (
    <section className={classes.restrictions}>
      <Title>
        <h1>
          Choose your <span>dietary restrictions</span> (if any)
        </h1>
        <p>your ingredients: {ingredients.join(", ")}</p>
      </Title>

      <div className={classes["restrictions-cards"]}>
        <Card type="card">
          <Image className={classes.image} src={glutenFree} alt="gluten-free" />
          <Badge
            type="checkbox"
            value="gluten-free"
            name="restrictions"
            onSelect={changeHandler}
          />
        </Card>
        <Card type="card">
          <Image className={classes.image} src={vegetarian} alt="vegetarian" />
          <Badge
            type="checkbox"
            value="vegetarian"
            name="restrictions"
            onSelect={changeHandler}
          />
        </Card>
        <Card type="card">
          <Image className={classes.image} src={vegan} alt="vegan" />
          <Badge
            type="checkbox"
            value="vegan"
            name="restrictions"
            onSelect={changeHandler}
          />
        </Card>
        <Card type="card">
          <Image
            className={classes.image}
            src={lactoseFree}
            alt="lactose-free"
          />
          <Badge
            type="checkbox"
            value="lactose-free"
            name="restrictions"
            onSelect={changeHandler}
          />
        </Card>
      </div>

      <div className={classes.buttons}>
        <Link href="/ingredients">
          <Button>Back</Button>
        </Link>
        <Link onClick={setRestrictionsHandler} href="/preferences">
          <Button>Next</Button>
        </Link>
      </div>
    </section>
  );
};

export default Restrictions;

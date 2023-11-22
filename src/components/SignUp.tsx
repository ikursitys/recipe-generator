"use client";

import classes from "./SignUp.module.css";
import { Button } from "./UI";
import { Title } from "./UI";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecipeContext } from "@/context/recipeContext";

const SignUp = () => {
  const router = useRouter();
  const [signUpData, setSignUpData] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({ name: "", email: "", password: "", confirmPassword: "" });
  const { recipeTitle, recipeIngredients, recipeInstructions } =
    useRecipeContext();

  const [error, setError] = useState<string>("");

  const submitData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !signUpData.name ||
      !signUpData.email ||
      !signUpData.password ||
      !signUpData.confirmPassword
    ) {
      setError("All inputs must be filled!");
      return;
    }

    const { name, email, password, confirmPassword } = signUpData;
    if (password !== confirmPassword) {
      setError("Your passwords should match!");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const userInfo = await response.json();
      console.log(userInfo);
      if (recipeTitle && recipeIngredients && recipeInstructions) {
        router.push("/recipe");
      }
      router.push("/");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className={classes.signup}>
      <Title>
        <h1>
          Enter your <span>name</span>, <span>email</span> and{" "}
          <span>password</span> to sign up
        </h1>
      </Title>
      <form onSubmit={submitData}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className={error ? classes["input-error"] : ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSignUpData({ ...signUpData, name: e.target.value });
            setError("");
          }}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className={error ? classes["input-error"] : ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSignUpData({ ...signUpData, email: e.target.value });
            setError("");
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className={error ? classes["input-error"] : ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSignUpData({ ...signUpData, password: e.target.value });
            setError("");
          }}
        />
        <label htmlFor="confirm-password">Confirm your password</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          className={error ? classes["input-error"] : ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSignUpData({ ...signUpData, confirmPassword: e.target.value });
            setError("");
          }}
        />
        {error && <p className={classes.error}>{error}</p>}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SignUp;

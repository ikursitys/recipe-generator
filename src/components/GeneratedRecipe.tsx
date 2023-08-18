"use client";

import { useRequestContext } from "../context/requestContext";

import Card from "./UI/Card";

import classes from "./GeneratedRecipe.module.css";
import Button from "./UI/Button";
import RecipeCard from "./RecipeCard";
import { useRecipeContext } from "../context/recipeContext";
import { convertRecipe } from "../utils/recipeConverter";
import Title from "./UI/Title";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Modal from "./UI/Modal";
import { useCompletion } from "ai/react";
import Loader from "./UI/Loader";

const GeneratedRecipe = () => {
  const {
    meal,
    ingredients,
    restrictions,
    preferences,
    setMeal,
    setIngredients,
    setRestrictions,
    setPreferences,
  } = useRequestContext();

  const ingredientsStr = ingredients.join(", ");
  const restrictionsStr = restrictions.join(", ");
  const {
    recipeTitle,
    recipeIngredients,
    recipeInstructions,
    setRecipeTitle,
    setRecipeIngredients,
    setRecipeInstructions,
  } = useRecipeContext();

  const session = useSession();
  const router = useRouter();

  const { complete } = useCompletion();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const isRecipe = recipeTitle && recipeIngredients && recipeInstructions;
  const isRequest = meal || ingredients || restrictions || preferences;

  const prompt = `Write a recipe for ${meal} with ${ingredientsStr}. The meal has to be ${restrictionsStr} and ${preferences}. Write 'Recipe:' before the recipe title. Write '###' after each cooking instruction, please`;

  useEffect(() => {
    const generateRecipe = async (prompt: string) => {
      setIsLoading(true);
      const completion = await complete(prompt);
      console.log(prompt);

      if (!completion) throw new Error("Failed to generate");

      const { recipeTitle, recipeIngredients, recipeInstructions } =
        convertRecipe(completion);

      setRecipeTitle(recipeTitle);
      setRecipeIngredients(recipeIngredients);
      setRecipeInstructions(recipeInstructions);
      setIsLoading(false);
    };
    if (isRequest && prompt) {
      generateRecipe(prompt);
    }
  }, []);

  const onSaveRecipe = async () => {
    if (!session.data) {
      router.push("/login");
      return;
    }
    if (isRecipe && session.data) {
      const userData = session.data;
      try {
        const response = await fetch("/api/recipes/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipeTitle,
            recipeIngredients,
            recipeInstructions,
            userData,
          }),
        });
        console.log("saved");
        const recipe = await response.json();
        console.log(recipe);
        setShowAlert(true);

        // router.push("/profile");
      } catch (e: any) {
        console.log(e);
      }
    }
  };

  const onClear = () => {
    setMeal("");
    setIngredients([]);
    setRestrictions([]);
    setPreferences("");
  };

  return (
    <section className={classes.recipes}>
      {isLoading && <Loader />}
      {isRecipe && !isLoading && (
        <>
          <Title>
            <h1>
              Here&apos;s what we found for your <span>{meal}</span>{" "}
              {ingredients && (
                <>
                  with <span>{ingredientsStr}</span>{" "}
                </>
              )}
              {restrictionsStr && preferences && (
                <>
                  considering your <span>{restrictionsStr}</span> and{" "}
                  <span>{preferences}</span> preferences
                </>
              )}
              {restrictionsStr && !preferences && (
                <>
                  considering your <span>{restrictionsStr}</span> preferences
                </>
              )}
              {!restrictionsStr && preferences && (
                <>
                  considering your <span>{preferences}</span> preferences
                </>
              )}
            </h1>
          </Title>

          <Card type="recipe">
            <RecipeCard
              title={recipeTitle}
              ingredients={recipeIngredients}
              instructions={recipeInstructions}
            />
            <div className={classes.buttons}>
              <Button handleClick={onSaveRecipe}>Save</Button>
              <Link href="/meal">
                <Button handleClick={onClear}>Try again</Button>
              </Link>
            </div>
          </Card>
        </>
      )}
      {!isRecipe && !isLoading && (
        <>
          <Title>
            <h1>No recipe yet...</h1>
          </Title>
          <Link href="/meal">
            <Button>Generate</Button>
          </Link>
        </>
      )}
      {error && <p>{error}</p>}
      <Modal isVisible={showAlert} onClose={() => setShowAlert(false)}>
        <Title>
          Your <span>recipe</span> has been saved!
        </Title>
        <div className="flex justify-around mt-20">
          <Button
            handleClick={() => {
              router.push("/profile/recipes");
            }}
          >
            My recipes
          </Button>
          <Button handleClick={() => setShowAlert(false)}>Close</Button>
        </div>
      </Modal>
    </section>
  );
};

export default GeneratedRecipe;

"use client";

import { useRequestContext } from "../context/requestContext";

import { Card } from "./UI";

import classes from "./GeneratedRecipe.module.css";
import { Button } from "./UI";
import RecipeCard from "./RecipeCard";

import { convertRecipe } from "../utils/recipeConverter";
import { Title } from "./UI";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Modal } from "./UI";
import { useCompletion } from "ai/react";
import { Loader } from "./UI";

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

  const [recipeTitle, setRecipeTitle] = useState<string>("");
  const [recipeIngredients, setRecipeIngredients] = useState<string[]>([]);
  const [recipeInstructions, setRecipeInstructions] = useState<string[]>([]);

  const session = useSession();
  const router = useRouter();

  const { complete } = useCompletion();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const isRecipe = recipeTitle && recipeIngredients && recipeInstructions;

  const isPrompt = !!(meal || ingredientsStr || restrictionsStr || preferences);

  const prompt = `Write a recipe for ${meal} with ${ingredientsStr}. The meal has to be ${restrictionsStr} and ${preferences}. Write 'Recipe:' before the recipe title. Write '###' after each cooking instruction, please`;

  const generateRecipe = useCallback(
    async (prompt: string) => {
      setIsLoading(true);
      const completion = await complete(prompt);

      if (!completion) throw new Error("Failed to generate");

      const { recipeTitle, recipeIngredients, recipeInstructions } =
        convertRecipe(completion);

      setRecipeTitle(recipeTitle);
      setRecipeIngredients(recipeIngredients);
      setRecipeInstructions(recipeInstructions);
      // setRecipe({ recipeTitle, recipeIngredients, recipeInstructions });
      localStorage.setItem(
        "recipe",
        JSON.stringify({ recipeTitle, recipeIngredients, recipeInstructions })
      );

      setIsLoading(false);
    },
    [complete, setRecipeTitle, setRecipeIngredients, setRecipeInstructions]
  );

  useEffect(() => {
    if (isPrompt) {
      generateRecipe(prompt);
    } else if (localStorage.getItem("recipe")) {
      const loadedRecipe = JSON.parse(localStorage.getItem("recipe")!);

      setRecipeTitle(loadedRecipe.recipeTitle);
      setRecipeIngredients(loadedRecipe.recipeIngredients);
      setRecipeInstructions(loadedRecipe.recipeInstructions);
    }
  }, []);

  const readyToUse = useMemo(
    () => isRecipe && !isLoading && isPrompt,
    [isRecipe, isLoading, isPrompt]
  );

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

        const recipe = await response.json();
        setShowAlert(true);
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
      {readyToUse && (
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
      )}

      {isRecipe && !isLoading && (
        <Card type="recipe">
          <RecipeCard
            title={recipeTitle}
            ingredients={recipeIngredients}
            instructions={recipeInstructions}
          />
          <div className={classes.buttons}>
            <Button onClick={onSaveRecipe}>Save</Button>
            <Link href="/meal">
              <Button onClick={onClear}>Try again</Button>
            </Link>
          </div>
        </Card>
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
            onClick={() => {
              router.push("/saved");
            }}
          >
            My recipes
          </Button>
          <Button onClick={() => setShowAlert(false)}>Close</Button>
        </div>
      </Modal>
    </section>
  );
};

export default GeneratedRecipe;

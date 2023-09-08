"use client";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { Title } from "./UI/";
import { Card } from "./UI/";
import classes from "./SavedRecipe.module.css";
import RecipeCard from "./RecipeCard";

interface SavedRecipe {
  title: string;
  ingredients: string[];
  instructions: string[];
}

const SavedRecipe = ({ recipe }: { recipe: SavedRecipe }) => {
  console.log(recipe);
  const { title, ingredients, instructions } = recipe;
  return (
    <RecipeCard
      title={title}
      ingredients={ingredients}
      instructions={instructions}
    ></RecipeCard>
  );
};

export default SavedRecipe;

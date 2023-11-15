"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { Loader } from "./UI";

const SavedRecipesList = () => {
  const [recipes, setRecipes] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes/", {
          method: "GET",
        });

        const recipes = await response.json();
        setRecipes(recipes);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <Link
                key={recipe._id}
                href={{
                  pathname: `/saved/${recipe._id}`,
                }}
              >
                <h2>{recipe.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SavedRecipesList;

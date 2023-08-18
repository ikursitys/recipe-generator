"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface RecipeData {
  recipeTitle: string;
  setRecipeTitle: Dispatch<SetStateAction<string>>;
  recipeIngredients: string[];
  setRecipeIngredients: Dispatch<SetStateAction<string[]>>;
  recipeInstructions: string[];
  setRecipeInstructions: Dispatch<SetStateAction<string[]>>;
}

const defaultState = {
  recipeTitle: "",
  setRecipeTitle: (title: string) => {},
  recipeIngredients: [],
  setRecipeIngredients: (title: string[]) => {},
  recipeInstructions: [],
  setRecipeInstructions: (title: string[]) => {},
} as RecipeData;

export const RecipeContext = createContext(defaultState);

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeContextProvider = ({ children }: RecipeProviderProps) => {
  const [recipeTitle, setRecipeTitle] = useState<string>("");
  const [recipeIngredients, setRecipeIngredients] = useState<string[]>([]);
  const [recipeInstructions, setRecipeInstructions] = useState<string[]>([]);

  return (
    <RecipeContext.Provider
      value={{
        recipeTitle,
        setRecipeTitle,
        recipeIngredients,
        setRecipeIngredients,
        recipeInstructions,
        setRecipeInstructions,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => useContext(RecipeContext);

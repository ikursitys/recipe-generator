"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

// export enum Meal {
//   breakfast = "breakfast",
//   lunch = "lunch",
//   dinner = "dinner",
//   snack = "snack",
// }

interface RequestData {
  meal: string;
  ingredients: string[];
  restrictions: string[];
  preferences: string;
  setMeal: Dispatch<SetStateAction<string>>;
  setIngredients: Dispatch<SetStateAction<string[]>>;
  setRestrictions: Dispatch<SetStateAction<string[]>>;
  setPreferences: Dispatch<SetStateAction<string>>;
}

const defaultState = {
  meal: "",
  setMeal: (meal: string) => {},
  ingredients: [],
  setIngredients: (ingredients: string[]) => {},
  restrictions: [],
  setRestrictions: (restrictions: string[]) => {},
  preferences: "",
  setPreferences: (preferences: string) => {},
} as RequestData;

export const RequestContext = createContext(defaultState);

interface RequestProviderProps {
  children: ReactNode;
}

export const RequestContextProvider = ({ children }: RequestProviderProps) => {
  const [meal, setMeal] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string>("");

  return (
    <RequestContext.Provider
      value={{
        meal,
        setMeal,
        ingredients,
        setIngredients,
        restrictions,
        setRestrictions,
        preferences,
        setPreferences,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequestContext = () => useContext(RequestContext);

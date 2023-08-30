export const convertRecipe = (recipeString: string) => {
  const titleAndAll = recipeString.split("Recipe:").map((r) => r.trim());

  const titleIngredientsAndAll = titleAndAll[1].split("Ingredients:");

  const recipeTitle = titleIngredientsAndAll[0];

  const ingrAndInstrArr = titleIngredientsAndAll[1].split("Instructions:");

  const recipeIngredients = ingrAndInstrArr[0]
    .split("-")
    .map((ing) => ing.trim())
    .filter((el) => el !== "");
  const recipeInstructions = ingrAndInstrArr[1]
    .split("###")
    .map((ing) => ing.trim())
    .filter((el) => el !== "");

  return { recipeTitle, recipeIngredients, recipeInstructions };
};

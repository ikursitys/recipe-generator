const DUMMY =
  "Recipe: Lentil, Potato, and Tomato Curry\
Ingredients:\
- 1 cup dried lentils (green or brown), rinsed\
- 2 medium-sized potatoes, peeled and cubed\
- 2 large tomatoes, diced\
- 1 onion, finely chopped\
- 3 cloves of garlic, minced\
- 1-inch piece of ginger, grated\
- 1 teaspoon ground cumin\
- 1 teaspoon ground coriander\
- ½ teaspoon turmeric powder\
- ½ teaspoon paprika (optional for added heat)\
- Salt to taste\
- Fresh cilantro leaves for garnish\
Instructions:\
1. In a large pot or saucepan, add the rinsed lentils along with enough water to cover them by about an inch. Bring it to a boil over high heat.\
2. Reduce the heat to low and let the lentils simmer uncovered for about 15 minutes until they are partially cooked but still firm. Drain any excess water and set aside.\
3. In another pan or skillet over medium heat, add a tablespoon of oil (olive oil or vegetable oil) and sauté the onions until translucent.\
4. Add minced garlic and grated ginger to the pan with onions; cook for another minute until fragrant.\
5. Now add diced tomatoes along with cumin powder, coriander powder, turmeric powder, paprika (if using), and salt to taste. Stir well to combine all ingredients evenly.\
6. Allow the tomato mixture to cook down on medium-low heat for about five minutes until it thickens slightly.\
7. Add in partially cooked lentils and cubed potatoes into the tomato mixture; stir everything together gently.\
8. Pour enough water into the pot just so that it covers all ingredients completely without submerging them entirely.\
9.Cover with a lid and let it simmer on low-medium heat for approximately twenty-five minutes or until the lentils and potatoes are fully cooked and tender.\
10. Check for seasoning, adding more salt if needed.\
11. Once ready, remove from heat and let it sit covered for a few minutes to allow the flavors to meld together.\
12. Serve hot with steamed rice or gluten-free flatbread of your choice.\
13. Garnish with fresh cilantro leaves before serving.\
Enjoy your delicious gluten-free, vegan Lentil, Potato, and Tomato Curry!";

export const convertRecipe = (recipeString: string) => {
  const titleAndAll = recipeString.split("Recipe:").map((r) => r.trim());
  console.log(titleAndAll);

  const titleIngredientsAndAll = titleAndAll[1].split("Ingredients:");

  const recipeTitle = titleIngredientsAndAll[0];
  console.log(recipeTitle);

  console.log(titleIngredientsAndAll[1]);

  const ingrAndInstrArr = titleIngredientsAndAll[1].split("Instructions:");
  console.log(ingrAndInstrArr[0]);
  console.log(ingrAndInstrArr[1]);

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

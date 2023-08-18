import classes from "./RecipeCard.module.css";
import Title from "./UI/Title";

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
}

const RecipeCard = ({ title, ingredients, instructions }: Recipe) => {
  return (
    <div className={classes.recipe}>
      <Title>{title}</Title>
      <h2>Ingredients</h2>

      <ul>
        {ingredients.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>

      <h2>Instructions</h2>

      <ul>
        {instructions.map((act) => (
          <li key={act}>{act}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeCard;

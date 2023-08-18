import Link from "next/link";
import Button from "./UI/Button";
import Title from "./UI/Title";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <section className={classes.home}>
      <Title>
        Welcome to <span>RecipeAI</span>: Your Gateway to Culinary Innovation!
      </Title>
      <p>
        Experience a new way to cook with our app, RecipeAI! This user-friendly
        app uses AI to generate easy and delicious recipes personalized just for
        you. Say goodbye to recipe searches and hello to stress-free cooking.
        Start using RecipeAI today and simplify your culinary adventures!
      </p>
      <Link href="/meal">
        <Button>Start</Button>
      </Link>
    </section>
  );
};

export default Home;

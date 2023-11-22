import Link from "next/link";
import { Button } from "./UI";
import { Title } from "./UI";
import classes from "./About.module.css";

const About = () => {
  return (
    <section className={classes.about}>
      <Title>
        Welcome to <span>RecipeAI</span>: The AI-Powered Recipe Generator!
      </Title>
      <p>
        We believe that cooking should be a delightful and accessible experience
        for everyone. We are passionate about bringing the power of artificial
        intelligence to the kitchen, revolutionizing the way you discover,
        create, and savor amazing dishes. With AI technology, we aim to inspire
        culinary exploration and unleash your inner chef.
      </p>

      <h2>Our Story:</h2>

      <p>
        RecipeAI was born out of a love for both technology and food. We
        recognized the need for a platform that could generate innovative and
        personalized recipes tailored to individual tastes and dietary
        preferences. By combining cutting-edge AI algorithms with an extensive
        database of ingredients and flavors, we embarked on a mission to empower
        home cooks, aspiring chefs, and anyone who loves good food.
      </p>
      <h2>How It Works:</h2>
      <p>
        RecipeAI utilizes the latest advancements in artificial intelligence to
        analyze a vast collection of recipes, flavor profiles, and ingredient
        combinations. Our intelligent algorithm learns from millions of recipes
        and culinary traditions, allowing it to generate unique and inspired
        dishes. Whether you&apos;re craving a comforting home-cooked meal,
        seeking a new twist on a classic recipe, or want to impress your dinner
        guests, our AI system will guide you every step of the way.
      </p>
      <h2>Personalization and Adaptability:</h2>
      <p>
        We understand that each individual has their own unique tastes, dietary
        requirements, and ingredient preferences. That&apos;s why RecipeAI
        offers a personalized experience, tailoring recipe recommendations to
        suit your specific needs. Our app takes into account your dietary
        restrictions, allergies, and even the ingredients you already have on
        hand, ensuring that you can create delicious meals without any hassle.
      </p>
      <h2>Endless Culinary Inspiration: </h2>
      <p>
        With RecipeAI, you&apos;ll never run out of ideas or get stuck in a
        culinary rut. Our AI-powered recipe generator introduces you to an
        extensive range of flavors, ingredients, and cooking techniques from
        around the world. From traditional family recipes to modern fusion
        cuisine, our app encourages exploration and experimentation, helping you
        discover new favorites and expand your culinary horizons.
      </p>
      <h2>Start Your Culinary Adventure Today</h2>
      <Link href="/settings/meal">
        <Button>Start</Button>
      </Link>
    </section>
  );
};

export default About;

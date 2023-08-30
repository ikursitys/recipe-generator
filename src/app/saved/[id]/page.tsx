"use client";
import RecipeCard from "@/components/RecipeCard";

import Button from "@/components/UI/Button";
import Card from "@/components/UI/Card";
import Loader from "@/components/UI/Loader";
import Modal from "@/components/UI/Modal";
import Title from "@/components/UI/Title";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PageProps {
  id: string;
}

interface SavedRecipe {
  title: string;
  ingredients: string[];
  instructions: string[];
}

const SavedRecipePage = ({ params }: { params: PageProps }) => {
  const [savedRecipe, setSavedRecipe] = useState<SavedRecipe>({
    title: "",
    ingredients: [],
    instructions: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `/api/recipes/${params.id}` +
            "?" +
            new URLSearchParams({ id: params.id }),
          {
            method: "GET",
          }
        );

        const recipe = await response.json();
        console.log(recipe);
        setSavedRecipe(recipe);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchRecipe();
  }, []);

  const onDelete = async () => {
    try {
      const response = await fetch("/api/recipes/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipeId: params.id,
        }),
      });

      const res = await response.json();
      console.log(res);
      router.push("/saved");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && savedRecipe && (
        <Card type="recipe">
          <RecipeCard
            title={savedRecipe.title}
            ingredients={savedRecipe.ingredients}
            instructions={savedRecipe.instructions}
          />
          <Button
            handleClick={() => {
              setShowConfirmation(true);
            }}
          >
            Delete
          </Button>
        </Card>
      )}
      <Modal
        isVisible={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      >
        <Title>
          Are you sure you want to <span>remove this recipe?</span>
        </Title>
        <div className="flex justify-around mt-20">
          <Button handleClick={onDelete}>Yes</Button>
          <Button
            handleClick={() => {
              setShowConfirmation(false);
            }}
          >
            No
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SavedRecipePage;

"use client";
import RecipeCard from "../../../components/RecipeCard";
import { Button } from "../../../components/UI";
import { Card } from "../../../components/UI";
import { Loader } from "../../../components/UI";
import { Modal } from "../../../components/UI";
import { Title } from "../../../components/UI";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface PageProps {
  id: string;
}

interface SavedRecipe {
  title: string;
  ingredients: string[];
  instructions: string[];
}

const SavedRecipePage = ({ params }: { params: PageProps }) => {
  const session = useSession();

  if (!session.data) {
    redirect("/login");
  }

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
        const response = await fetch(`/api/recipes/${params.id}`, {
          method: "GET",
        });

        const recipe = await response.json();

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
            onClick={() => {
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
          <Button onClick={onDelete}>Yes</Button>
          <Button
            onClick={() => {
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

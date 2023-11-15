import SavedRecipesList from "@/components/SavedRecipesList";
import { Card } from "../../components/UI";
import { Title } from "../../components/UI";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

const SavedRecipes = async () => {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="mt-12">
      <Card type="recipe">
        <Title>Your saved recipes:</Title>
        <SavedRecipesList />
      </Card>
    </div>
  );
};

export default SavedRecipes;

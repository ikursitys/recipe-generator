import startDb from "@/lib/db";
import UserModel from "@/models/UserModel";
import RecipeModel from "@/models/RecipeModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipeTitle, recipeIngredients, recipeInstructions, userData } =
      body;

    if (
      !recipeTitle ||
      !recipeIngredients ||
      !recipeInstructions ||
      !userData
    ) {
      return new NextResponse("Missing recipe or you are not logged in", {
        status: 400,
      });
    }

    await startDb();
    const userExists = await UserModel.findOne({ email: userData.user.email });

    if (!userExists) {
      return new NextResponse(
        "You are not registered yet! Sign up to continue",
        { status: 400 }
      );
    }

    const recipe = await RecipeModel.create({
      title: recipeTitle,
      ingredients: recipeIngredients,
      instructions: recipeInstructions,
      user: userExists._id,
    });

    userExists.recipes.push(recipe._id);
    await userExists.save();

    return NextResponse.json(recipe);
  } catch (error) {
    console.log(error);
  }
}

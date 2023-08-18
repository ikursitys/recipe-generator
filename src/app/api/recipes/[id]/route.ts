import { authConfig } from "@/configs/auth";
import startDb from "@/lib/db";
import RecipeModel from "@/models/RecipeModel";
import UserModel from "@/models/UserModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const recipeId = searchParams.get("id");

  try {
    await startDb();
    const recipe = await RecipeModel.findOne({ _id: recipeId });

    if (!recipe) {
      return new NextResponse("Could not fetch recipe!", {
        status: 400,
      });
    }

    return NextResponse.json(recipe);
  } catch (e) {
    console.log(e);
  }
}

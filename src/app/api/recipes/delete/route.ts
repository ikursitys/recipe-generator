import startDb from "@/lib/db";
import UserModel from "@/models/UserModel";
import RecipeModel from "@/models/RecipeModel";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { recipeId } = body;

  const session = await getServerSession(authConfig);
  if (!session || !session.user || !session.user.email) {
    return new NextResponse("You are not logged in...", {
      status: 400,
    });
  }

  if (!recipeId) {
    return new NextResponse("Something went wrong", {
      status: 400,
    });
  }
  try {
    await startDb();
    const userExists = await UserModel.findOne({ email: session.user.email });
    const recipeExists = await RecipeModel.findOne({ _id: recipeId });

    if (!userExists) {
      return new NextResponse(
        "You are not registered yet! Sign up to continue",
        { status: 400 }
      );
    }

    if (!recipeExists) {
      return new NextResponse("The recipe does not exist!", { status: 400 });
    }

    await RecipeModel.deleteOne({ _id: recipeId });

    userExists.recipes.filter((r) => r !== recipeId);
    await userExists.save();

    return NextResponse.json("The recipe was successfully removed!");
  } catch (error) {
    console.log(error);
  }
}

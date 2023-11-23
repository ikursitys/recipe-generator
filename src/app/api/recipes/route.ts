import { authConfig } from "@/configs/auth";
import startDb from "@/lib/db";
import RecipeModel from "@/models/RecipeModel";
import UserModel from "@/models/UserModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  const session = await getServerSession(authConfig);
  if (!session || !session.user || !session.user.email) {
    return new NextResponse("Something went wrong...", {
      status: 400,
    });
  }

  try {
    await startDb();
    const userExists = await UserModel.findOne({ email: session.user.email });

    if (!userExists) {
      return new NextResponse(
        "You are not registered yet! Sign up to continue",
        {
          status: 400,
        }
      );
    }

    const recipes = await RecipeModel.find({ user: userExists._id });
    return NextResponse.json(recipes);
  } catch (e) {
    console.log(e);
  }
}

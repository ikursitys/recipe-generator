import { authConfig } from "@/configs/auth";
import startDb from "@/lib/db";
import RecipeModel from "@/models/RecipeModel";
import UserModel from "@/models/UserModel";
import { getServerSession } from "next-auth";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  args: { params: { id: string } }
) {
  const session = await getServerSession(authConfig);

  if (!session || !session.user || !session.user.email) {
    return new NextResponse("Something went wrong...", {
      status: 400,
    });
  }

  const { params } = args;

  const recipeId = params.id;

  try {
    await startDb();

    const userExists = await UserModel.findOne({ email: session.user.email });

    if (!userExists) {
      return new NextResponse("There's no such user", {
        status: 400,
      });
    }

    const recipe = await RecipeModel.findOne({
      _id: recipeId,
      user: userExists._id,
    });

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

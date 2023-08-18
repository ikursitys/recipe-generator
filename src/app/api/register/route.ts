import startDb from "@/lib/db";
import UserModel from "@/models/UserModel";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    console.log(body);

    if (!name || !email || !password) {
      return new NextResponse("Missing name, email or password", {
        status: 400,
      });
    }

    await startDb();
    const userExists = await UserModel.findOne({ email: body.email });

    if (userExists) {
      return new NextResponse("User already exists!", { status: 400 });
    }

    const user = await UserModel.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}

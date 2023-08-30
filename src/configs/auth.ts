import type { AuthOptions, Profile, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import startDb from "@/lib/db";
import UserModel, { UserDocument } from "@/models/UserModel";

// interface Credentials extends Record<"name" | "email" | "password", string> {}

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "email",
      credentials: {
        name: { label: "username", type: "string", required: true },
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password || !credentials.name)
          return null;

        try {
          await startDb();
          const userExists = await UserModel.findOne({
            email: credentials.email,
          });

          if (!userExists) {
            throw new Error("The user does not exist!");
          }

          const verified = await userExists.comparePassword(
            credentials.password
          );

          if (verified) {
            return {
              id: userExists.id,
              email: userExists.email,
              name: userExists.name,
              image: userExists.image,
            };
          } else throw new Error("Your password is wrong! Try again!");
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ profile }: { profile?: Profile }) {
      console.log(profile);

      if (profile) {
        try {
          await startDb();
          const userExists = await UserModel.findOne({ email: profile.email });

          if (!userExists) {
            const user = await UserModel.create({
              email: profile.email,
              name: profile.name,
            });
          }

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return "http://localhost:3000/recipe";
    },
  },
};

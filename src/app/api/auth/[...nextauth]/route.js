import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import argon2i from "argon2";
import connectDB from "../../../../../middleware/db";
import User from "../../../../../models/user";

export const authOptions = {
  providers:[
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials){
        await connectDB();

        const { email, password } = credentials;

        const userExist = await User.findOne({ email });

        if (!userExist) {
          throw new Error("User Does not Exist !");
        }

        const matchPassword = await argon2i.verify( userExist.password, password );

        if (!matchPassword || userExist.email !== email) {
          throw new Error("Invalid Credentials");
        }
        return userExist;
      }
    })
  ],
  theme: {
    colorScheme: "light",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
    signIn:"/login",
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
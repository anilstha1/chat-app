import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {connect} from "./dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import User from "./models/userModel";
export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {label: "Username", type: "text", placeholder: "Usename"},
        password: {label: "Password", type: "password"},
      },
      authorize: async (credentials) => {
        connect();

        const {username, password}: any = credentials;
        const user = await User.findOne({username});
        if (user) {
          const validPassword = await bcryptjs.compare(password, user.password);
          if (!validPassword) {
            return null;
          }
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({token, user, session}: any) {
      if (user) {
        return {...token, id: user._id, username: user.username};
      }
      return token;
    },
    async session({session, token, user}: any) {
      session.user.id = token.id;
      session.user.username = token.username;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
});

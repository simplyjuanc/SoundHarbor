import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import bcrypt from 'bcrypt';
import prisma from "@/lib/db";

const authOptions:AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: 'user-credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        username: {label: 'email', type: 'email', placeholder: 'rick.astley@soundharbor.live'},
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials, req) {
        // const user = await prisma.user.findUnique({

        // console.log('credentials :>> ', credentials);
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        if (!user) return null;
        
        return user;
      },

    })
  ],
  session: { strategy:"jwt", maxAge: 2592000, updateAge: 86400 },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',


}


const handler = NextAuth(authOptions)


export { handler as GET, handler as POST }
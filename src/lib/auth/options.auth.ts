import { IAuthedJWT, IAuthedSession } from "@/@types";
import prisma from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'rick.astley@soundharbor.live' },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordsMatch) return null;

        return user;
      }
    })
  ],
  session: { strategy: "jwt", maxAge: 2592000, updateAge: 86400 },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  
  callbacks: {
    async jwt({ token, account, user }) {
      console.log('JWT callback: ', { token, account, user } );
      
      if (account && user) {
        token.accessToken = account.access_token ?? 'null';
        token.userId = user.id;
      }
      return token
    },
    async session({ session, token }) {
      console.log('Session callback - token: ', { token });
      const authedJWT = token as IAuthedJWT;
      if (token) {
        (session as IAuthedSession).accessToken = authedJWT.accessToken;
        (session as IAuthedSession).error = authedJWT.error;
        (session as IAuthedSession).userId = authedJWT.userID as string;
      }      
      console.log('Session callback - authed?Session', session)
      return session
    }  
  } 
};

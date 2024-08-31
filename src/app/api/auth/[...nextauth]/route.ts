
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { signin } from "@/app/services/authService/signin";

const handler = NextAuth({
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          if(!credentials) return null;

          const { data } = await signin(credentials);
          if(!data.token) return null;

          cookies().set('access_token', data.token);

          return {
            id: data.id,
            name: data.name,
            email: credentials.email,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };

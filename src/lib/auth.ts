import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "./prismaDB";
import { getServerSession, Session } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("INvalid Password");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      if (token) {
        session!.user!.name = token.name;
        session!.user!.email = token.email;
        session!.user!.image = token.picture;
      }

      return session;
    },
    async jwt({ token }) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: token.email as string,
        },
      });

      return {
        id: existingUser?.id,
        name: existingUser?.name,
        email: existingUser?.email,
        picture: existingUser?.imageUrl,
      };
    },
    async signIn({ user, account, credentials, email, profile }) {
      if (user) {
        return true;
      } else {
        return "/sign-in";
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
};

export async function getCurrentUser(): Promise<Session | null> {
  const session = await getServerSession(authOptions);

  return session;
}

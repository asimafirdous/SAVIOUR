import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/gmail.readonly",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          console.log("GOOGLE USER:", user);

          await prisma.user.upsert({
            where: {
              email: user.email!,
            },

            update: {
              name: user.name ?? "",
              profilePicture: user.image ?? null,
              googleId: account.providerAccountId,
              lastLoginAt: new Date(),
            },

            create: {
              email: user.email!,
              name: user.name ?? "",
              profilePicture: user.image ?? null,
              googleId: account.providerAccountId,
              lastLoginAt: new Date(),
            },
          });
        }

        return true;
      } catch (error) {
        console.error("AUTH ERROR:", error);
        return false;
      }
    },

    async session({ session }) {
      if (session.user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
        }
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
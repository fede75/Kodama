import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";

function parseAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

const adminEmails = parseAdminEmails();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true
    })
  ],
  pages: {
    signIn: "/"
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      const normalizedEmail = user.email.toLowerCase();
      const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
        select: { role: true }
      });
      const desiredRole =
        existingUser?.role === UserRole.ADMIN ||
        adminEmails.includes(normalizedEmail)
          ? UserRole.ADMIN
          : UserRole.USER;

      await prisma.user.upsert({
        where: { email: normalizedEmail },
        update: {
          role: desiredRole,
          name: user.name ?? normalizedEmail.split("@")[0],
          image: user.image
        },
        create: {
          email: normalizedEmail,
          role: desiredRole,
          name: user.name ?? normalizedEmail.split("@")[0],
          image: user.image
        }
      });

      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.userId = user.id;
      }

      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: {
            id: true,
            role: true,
            name: true,
            image: true
          }
        });

        if (dbUser) {
          token.userId = dbUser.id;
          token.role = dbUser.role;
          token.name = dbUser.name ?? token.name;
          token.picture = dbUser.image ?? token.picture;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.userId ?? "");
        session.user.role = (token.role as UserRole | undefined) ?? UserRole.USER;
      }

      return session;
    }
  }
});

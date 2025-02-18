import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import { authOptions } from "@/lib/auth";

export const auth = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  ...authOptions,
});

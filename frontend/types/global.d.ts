import { PrismaClient } from "@/app/generated/prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}
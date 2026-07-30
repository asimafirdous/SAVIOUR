/*
  Warnings:

  - You are about to drop the column `description` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `remindAt` on the `Reminder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Opportunity" DROP COLUMN "description",
ADD COLUMN     "link" TEXT,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Saved';

-- AlterTable
ALTER TABLE "Reminder" DROP COLUMN "remindAt",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "dueDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "googleId" DROP NOT NULL;

-- DropEnum
DROP TYPE "OpportunityStatus";

-- DropEnum
DROP TYPE "OpportunityType";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

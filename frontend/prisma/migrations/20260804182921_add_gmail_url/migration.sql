/*
  Warnings:

  - You are about to drop the column `category` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Email` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,title]` on the table `Reminder` will be added. If there are existing duplicate values, this will fail.
  - Made the column `content` on table `Email` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_userId_fkey";

-- DropForeignKey
ALTER TABLE "Opportunity" DROP CONSTRAINT "Opportunity_userId_fkey";

-- DropIndex
DROP INDEX "Opportunity_userId_company_title_key";

-- AlterTable
ALTER TABLE "Email" DROP COLUMN "category",
DROP COLUMN "createdAt",
ADD COLUMN     "gmailUrl" TEXT,
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "priority" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Reminder_userId_title_key" ON "Reminder"("userId", "title");

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email"("id") ON DELETE SET NULL ON UPDATE CASCADE;

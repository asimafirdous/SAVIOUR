/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Opportunity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,company,title]` on the table `Opportunity` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Opportunity" DROP COLUMN "updatedAt",
ALTER COLUMN "status" SET DEFAULT 'Applied';

-- CreateIndex
CREATE UNIQUE INDEX "Opportunity_userId_company_title_key" ON "Opportunity"("userId", "company", "title");

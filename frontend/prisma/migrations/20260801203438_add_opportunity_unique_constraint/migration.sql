/*
  Warnings:

  - A unique constraint covering the columns `[userId,company,title]` on the table `Opportunity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Opportunity_userId_company_title_key" ON "Opportunity"("userId", "company", "title");

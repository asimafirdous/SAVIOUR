/*
  Warnings:

  - You are about to drop the column `session_state` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Reminder` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Reminder` table. All the data in the column will be lost.
  - Added the required column `date` to the `Reminder` table without a default value. This is not possible if the table is not empty.
  - Made the column `googleId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "session_state";

-- AlterTable
ALTER TABLE "Opportunity" DROP COLUMN "link",
DROP COLUMN "type",
ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Reminder" DROP COLUMN "description",
DROP COLUMN "dueDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "googleId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "actionRequired" TEXT,
ADD COLUMN     "priority" TEXT DEFAULT 'Medium',
ADD COLUMN     "summary" TEXT;

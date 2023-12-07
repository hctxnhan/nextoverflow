/*
  Warnings:

  - You are about to drop the column `ts` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `ts` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `ts` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropIndex
DROP INDEX "ts_idx";

-- DropIndex
DROP INDEX "ts_idx_tag";

-- DropIndex
DROP INDEX "ts_idx_user";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "ts";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "ts";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ts";

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

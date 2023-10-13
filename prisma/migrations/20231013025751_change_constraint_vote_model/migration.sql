/*
  Warnings:

  - A unique constraint covering the columns `[userId,questionId,answerId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Vote_userId_answerId_key";

-- DropIndex
DROP INDEX "Vote_userId_questionId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_questionId_answerId_key" ON "Vote"("userId", "questionId", "answerId");

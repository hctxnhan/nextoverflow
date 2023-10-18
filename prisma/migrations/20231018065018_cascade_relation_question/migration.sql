-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_authorId_fkey";

-- DropForeignKey
ALTER TABLE "UserSavedQuestion" DROP CONSTRAINT "UserSavedQuestion_questionId_fkey";

-- DropForeignKey
ALTER TABLE "UserSavedQuestion" DROP CONSTRAINT "UserSavedQuestion_userId_fkey";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("clerkId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSavedQuestion" ADD CONSTRAINT "UserSavedQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSavedQuestion" ADD CONSTRAINT "UserSavedQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import * as z from "zod";

export const QuestionFormSchema = z.object({
  title: z.string().min(5).max(150),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerFormSchema = z.object({
  body: z.string().min(50),
});

export const VoteSchema = z.object({
  voteType: z.enum(["UPVOTE", "DOWNVOTE"]),
  questionId: z.number(),
  answerId: z.number().optional(),
});

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().min(1).default(1).catch(() => 1),
  pageSize: z.coerce.number().int().positive().min(1).max(50).default(10).catch(() => 10),
}).passthrough();

export const ProfileSchema = z.object({
  name: z.string().min(3).max(50),
  username: z.string().min(3).max(20),
  bio: z.string().min(10).max(150)
}).passthrough();
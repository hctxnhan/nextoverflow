import * as z from "zod";

export const QuestionFormSchema = z.object({
  title: z.string().min(5).max(150),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerFormSchema = z.object({
  body: z.string().min(50),
});

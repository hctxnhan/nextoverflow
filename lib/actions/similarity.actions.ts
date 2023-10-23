"use server";
import { PorterStemmer, TfIdf, WordTokenizer } from "natural";
import { cosineSimilarity } from "../cosineSimilarity";
import { prisma } from "../prismaClient";
import { removeCodeblockFromMarkdown } from "../utils";

const DEFAULT_SIMILARITY_THRESHOLD = 0.5;

export async function findSimilarQuestion(
  questions: {
    title: string;
    content: string;
  },
  similarityThreshold = DEFAULT_SIMILARITY_THRESHOLD,
) {
  const tfidf = new TfIdf();
  const { tokens, count } = await calculateTfIdfMatrix(tfidf);

  const similarity = await calculateSimilarity(tfidf, count, tokens, {
    title: questions.title,
    content: questions.content,
  });

  if (!similarity) return [];

  const sortedSimilarity = Object.entries(similarity)
    .filter(([, similarity]) => similarity > similarityThreshold)
    .sort(([, similarityA], [, similarityB]) => similarityB - similarityA);

  return sortedSimilarity;
}

export async function calculateTfIdfMatrix(tfidf: TfIdf) {
  const questions = await prisma.question.findMany();

  const tokenizer = new WordTokenizer();

  const tokens = questions.reduce(
    (acc, question, index) => {
      const questionText = removeCodeblockFromMarkdown(
        question.content + " " + question.title,
      );
      const tokens = tokenizer.tokenize(questionText)?.map(PorterStemmer.stem);

      if (!tokens) return acc;
      acc[question.id] = index;

      tfidf.addDocument(tokens);

      return acc;
    },
    {} as Record<number, number>,
  );

  return { tokens, count: questions.length };
}

export async function calculateSimilarity(
  tfidf: TfIdf,
  count: number,
  matrix: Record<number, number>,
  {
    title,
    content,
  }: {
    title: string;
    content: string;
  },
) {
  const questionText = removeCodeblockFromMarkdown(content + " " + title);
  const newQuestionTokens = new WordTokenizer()
    .tokenize(questionText)
    ?.map(PorterStemmer.stem);

  if (!newQuestionTokens) return;

  tfidf.addDocument(newQuestionTokens);

  const similarity: Record<string, number> = {};

  Object.entries(matrix).forEach(([questionId, index]) => {
    similarity[questionId] = cosineSimilarity(
      tfidf.listTerms(index),
      tfidf.listTerms(count),
    );
  });

  return similarity;
}

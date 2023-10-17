"use server";

import { GlobalSearchResult } from "@/types";
import { prisma } from "../prismaClient";

export async function globalSearch(
  searchTerm: string,
): Promise<Array<GlobalSearchResult>> {
  // TODO: Need to find a way to make this query safe
  return prisma.$queryRawUnsafe(`
        SELECT CAST(id AS VARCHAR) AS id,
              ts_headline(title, keywords) AS title,
              ts_headline(content, keywords) AS content,
              'question' AS TYPE
        FROM "Question",
            plainto_tsquery('english', '${searchTerm}') AS keywords
        WHERE ts @@ keywords
        UNION ALL
        SELECT name AS id,
              name AS title,
              description AS content,
              'tag' AS TYPE
        FROM "Tag"
        WHERE ts @@ plainto_tsquery('english', '${searchTerm}')
        UNION ALL
        SELECT CAST('clerkId' AS VARCHAR) AS id,
              name AS title,
              username AS content,
              'user' AS TYPE
        FROM "User"
        WHERE ts @@ plainto_tsquery('english', '${searchTerm}')
  `);
}

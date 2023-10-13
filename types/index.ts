import { QuestionFormSchema } from "@/lib/validation";
import z from "zod";

export enum SortOrder {
  // eslint-disable-next-line no-unused-vars
  ASC = "asc",
  // eslint-disable-next-line no-unused-vars
  DESC = "desc",
}

export type PaginationParams<T extends string = string> = {
  page: number;
  limit: number;
  search?: string;
  filter?: T;
};

export interface SidebarLink {
  Icon: any;
  route: string;
  label: string;
}

export type QuestionFormType = z.infer<typeof QuestionFormSchema>;

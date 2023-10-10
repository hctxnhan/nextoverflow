import { QuestionFormSchema } from "@/lib/validation";
import z from "zod";

export type PaginationParams = {
  page: number;
  limit: number;
  search?: string;
  filter?: string;
};

export interface SidebarLink {
  Icon: any;
  route: string;
  label: string;
}

export type QuestionFormType = z.infer<typeof QuestionFormSchema>;

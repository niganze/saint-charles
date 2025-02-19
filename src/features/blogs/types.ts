import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  image: z.any().optional(),
  published: z.boolean().default(false),
});

export type BlogFormData = z.infer<typeof blogSchema>;

export interface BlogResponse {
  id: number;
  title: string;
  content: string;
  image: string | null;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

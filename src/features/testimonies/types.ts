import { z } from "zod";

export const testimonySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  image: z.any().optional(),
});

export type TestimonyFormData = z.infer<typeof testimonySchema>;

export interface TestimonyResponse {
  id: number;
  name: string;
  content: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

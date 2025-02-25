import { z } from "zod";

const courseOptions = ["A1", "A2", "B1", "B2"] as const;
const scheduleOptions = [
  "08:00–11:00 (Morning Session)",
  "11:10–14:10 (Early Afternoon)",
  "14:20–17:20 (Late Afternoon)",
  "17:30–20:30 (Evening Session)",
  "08:30–15:30 (Weekend - Saturday & Sunday)",
] as const;

export const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  preferredCourse: z.enum(courseOptions, {
    errorMap: () => ({ message: "Please select a course level" }),
  }),
  preferredSchedule: z.enum(scheduleOptions, {
    errorMap: () => ({ message: "Please select a preferred schedule" }),
  }),
  additionalInfo: z.string().optional(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export interface RegistrationResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  preferredCourse: string;
  preferredSchedule: string;
  additionalInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const COURSE_OPTIONS = courseOptions;
export const SCHEDULE_OPTIONS = scheduleOptions;

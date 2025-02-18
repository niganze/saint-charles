import { TestimonyResponse } from "./types";

export interface TestimonyFormData {
  name: string;
  content: string;
  image?: File;
}

export const getTestimonies = async (): Promise<TestimonyResponse[]> => {
  const response = await fetch("/api/testimonies", {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to fetch testimonies");
  return response.json();
};

export const createTestimony = async (
  formData: FormData
): Promise<TestimonyResponse> => {
  const response = await fetch("/api/testimonies", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create testimony");
  }
  return response.json();
};

export const updateTestimony = async (
  id: number,
  formData: FormData
): Promise<TestimonyResponse> => {
  const response = await fetch(`/api/testimonies/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update testimony");
  }
  return response.json();
};

export const deleteTestimony = async (id: number): Promise<void> => {
  const response = await fetch(`/api/testimonies/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete testimony");
  }
};

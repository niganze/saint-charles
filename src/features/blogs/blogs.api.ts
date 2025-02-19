import { BlogResponse } from "./types";

export const getBlogs = async (): Promise<BlogResponse[]> => {
  const response = await fetch("/api/blogs", {
    method: "GET",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch blogs");
  }
  return response.json();
};

export const createBlog = async (formData: FormData): Promise<BlogResponse> => {
  const response = await fetch("/api/blogs", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create blog");
  }
  return response.json();
};

export const updateBlog = async (
  id: number,
  formData: FormData
): Promise<BlogResponse> => {
  const response = await fetch(`/api/blogs/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update blog");
  }
  return response.json();
};

export const deleteBlog = async (id: number): Promise<void> => {
  const response = await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete blog");
  }
};

export const publishBlog = async (id: number): Promise<BlogResponse> => {
  const response = await fetch(`/api/blogs/${id}/publish`, {
    method: "PUT",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to publish blog");
  }
  return response.json();
};

export const unpublishBlog = async (id: number): Promise<BlogResponse> => {
  const response = await fetch(`/api/blogs/${id}/unpublish`, {
    method: "PUT",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to unpublish blog");
  }
  return response.json();
};

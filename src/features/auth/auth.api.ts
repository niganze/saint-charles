import { SignInData, ProfileData } from "./types";

export const signInUser = async (data: SignInData) => {
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.message);
  }

  return response.json();
};

export const updateUserProfile = async (data: ProfileData) => {
  const response = await fetch("/api/auth/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.message);
  }

  return response.json();
};

export const updatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await fetch("/api/auth/password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.message);
  }

  return response.json();
};

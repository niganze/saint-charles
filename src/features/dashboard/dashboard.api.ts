import { DashboardStats } from "./types";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch("/api/dashboard/stats");

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return response.json();
};

"use client";

import { AdminLayout } from "@/components/layouts/AdminLayout";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { getDashboardStats } from "@/features/dashboard/dashboard.api";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
  });

  if (error) {
    toast.error("Failed to load dashboard stats");
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Users"
          value={isLoading ? "Loading..." : stats?.userCount ?? 0}
        />
        <StatCard
          title="Published Blogs"
          value={isLoading ? "Loading..." : stats?.publishedBlogCount ?? 0}
        />
        <StatCard
          title="Testimonies"
          value={isLoading ? "Loading..." : stats?.testimonyCount ?? 0}
        />
      </div>

      {/* Add more dashboard content here */}
    </AdminLayout>
  );
}

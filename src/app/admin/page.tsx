"use client";

import { AdminLayout } from "@/components/layouts/AdminLayout";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { getDashboardStats } from "@/features/dashboard/dashboard.api";
import { useQuery } from "@tanstack/react-query";
import { LoadingDots } from "@/components/ui/loading-dots";
import {
  Users,
  BookOpen,
  MessageSquare,
  Clock,
  Mail,
  UserPlus,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminDashboard() {
  const { session, isLoading: isAuthLoading } = useAuth();

  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
    enabled: !!session,
  });

  if (isAuthLoading) {
    return <LoadingDots />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl p-8">
        <div className="flex gap-4 flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {session?.user?.name}!
            </h1>
            <p className="mt-1 text-gray-500">
              Here's what's happening with your website today.
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{new Date().toDateString()}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard
          title="Published Blogs"
          value={
            isStatsLoading ? <LoadingDots /> : stats?.publishedBlogCount ?? 0
          }
          icon={<BookOpen className="w-5 h-5 text-sc-yellow" />}
          link="/admin/blogs"
        />
        <StatCard
          title="Testimonies"
          value={isStatsLoading ? <LoadingDots /> : stats?.testimonyCount ?? 0}
          icon={<MessageSquare className="w-5 h-5 text-sc-red" />}
          link="/admin/testimonies"
        />
        <StatCard
          title="Contact Inquiries"
          value={isStatsLoading ? <LoadingDots /> : stats?.contactCount ?? 0}
          icon={<Mail className="w-5 h-5 text-sc-yellow" />}
          link="/admin/contacts"
        />
        <StatCard
          title="Course Registrations"
          value={
            isStatsLoading ? <LoadingDots /> : stats?.registrationCount ?? 0
          }
          icon={<UserPlus className="w-5 h-5 text-sc-red" />}
          link="/admin/registrations"
        />
      </div>
    </div>
  );
}

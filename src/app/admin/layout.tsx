"use client";

import { AppBar } from "@/components/layouts/AppBar";
import { SessionProvider } from "next-auth/react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        <AppBar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}

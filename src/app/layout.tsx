"use client";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "@/providers/QueryProvider";
import { SessionProvider } from "@/providers/SessionProvider";
import { Suspense } from "react";
import { Loader } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <QueryProvider>
            <Suspense fallback={<Loader className="animate-spin h-4 w-4" />}>
              {children}
            </Suspense>
            <Toaster position="top-right" />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

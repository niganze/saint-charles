import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const inter = PT_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Saint Charles K. LTD - German Language School in Kigali",
  description:
    "Learn German with confidence at Saint Charles K. LTD. We offer comprehensive German language courses from A1 to C2 levels in Kigali, Rwanda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logos/white-red.png" sizes="32x32" />
      </head>
      <body className={`${inter.className} flex min-h-full flex-col`}>
        <div className="flex-1">
          <QueryProvider>
            <Suspense fallback={<Loader className="animate-spin h-4 w-4" />}>
              {children}
            </Suspense>
          </QueryProvider>
          <Toaster position="top-right" />
        </div>
      </body>
    </html>
  );
}

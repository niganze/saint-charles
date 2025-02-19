import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "@/providers/QueryProvider";
import { SessionProvider } from "@/providers/SessionProvider";
import { Suspense } from "react";
import { Loader } from "lucide-react";

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
        <link rel="icon" href="/logo.png" sizes="32x32" />
      </head>
      <body className={`${inter.className} flex min-h-full flex-col`}>
        <Header />
        <div className="flex-1 pt-20">
          <SessionProvider>
            <QueryProvider>
              <Suspense fallback={<Loader className="animate-spin h-4 w-4" />}>
                {children}
              </Suspense>
            </QueryProvider>
          </SessionProvider>
        </div>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

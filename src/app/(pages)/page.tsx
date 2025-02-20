import { HeroSection } from "@/features/home/components/hero-section";
import { FeaturesSection } from "@/features/home/components/features-section";
import { CoursesSection } from "@/features/home/components/courses-section";
import { TestimonialsSection } from "@/features/home/components/testimonials-section";
import { RecentBlogsSection } from "@/features/home/components/recent-blogs-section";
import { ScheduleSection } from "@/features/home/components/schedule-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saint Charles K. LTD - German Language School in Kigali",
  description:
    "Learn German with confidence at Saint Charles K. LTD. We offer comprehensive German language courses from A1 to C2 levels in Kigali, Rwanda. Join our expert-led classes with flexible schedules.",
  openGraph: {
    title: "Saint Charles K. LTD - German Language School in Kigali",
    description:
      "Learn German with confidence at Saint Charles K. LTD. We offer comprehensive German language courses from A1 to C2 levels in Kigali, Rwanda. Join our expert-led classes with flexible schedules.",
    type: "website",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <CoursesSection />
      <ScheduleSection />
      <TestimonialsSection />
      <RecentBlogsSection />
    </main>
  );
}

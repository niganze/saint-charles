import { CoursesHero } from "@/features/courses/components/courses-hero";
import { CoursesGrid } from "@/features/courses/components/courses-grid";
import { CourseFeatures } from "@/features/courses/components/course-features";
import { ScheduleSection } from "@/features/home/components/schedule-section";
import { TestimonialsSection } from "@/features/home/components/testimonials-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "German Language Courses | Saint Charles K. LTD - A1 to C2 Levels",
  description:
    "Explore our comprehensive German language courses from A1 to C2 levels. Learn with expert teachers in small classes with flexible schedules in Kigali.",
  openGraph: {
    title: "German Language Courses | Saint Charles K. LTD",
    description:
      "Explore our comprehensive German language courses from A1 to C2 levels. Learn with expert teachers in small classes with flexible schedules in Kigali.",
    type: "website",
    url: "/courses",
  },
};

export default function CoursesPage() {
  return (
    <main className="bg-white">
      <CoursesHero />
      <CoursesGrid />
      <CourseFeatures />
      <TestimonialsSection />
      <ScheduleSection />
    </main>
  );
}

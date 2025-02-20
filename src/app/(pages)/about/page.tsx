import { AboutHero } from "@/features/about/components/about-hero";
import { MissionVision } from "@/features/about/components/mission-vision";
import { ValuesSection } from "@/features/about/components/values-section";
import { JourneySection } from "@/features/about/components/journey-section";
import { CoursesOverview } from "@/features/about/components/courses-overview";
import { ScheduleSection } from "@/features/home/components/schedule-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Saint Charles K. LTD - German Language School in Kigali",
  description:
    "Learn about our mission, values, and journey in providing quality German language education in Kigali. Discover our comprehensive courses and flexible schedules.",
  openGraph: {
    title: "About Saint Charles K. LTD - German Language School",
    description:
      "Learn about our mission, values, and journey in providing quality German language education in Kigali. Discover our comprehensive courses and flexible schedules.",
    type: "website",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutHero />
      <MissionVision />
      <ValuesSection />
      <JourneySection />
      <CoursesOverview />
      <ScheduleSection />
    </main>
  );
}

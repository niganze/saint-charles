import { HeroSection } from "@/features/home/components/hero-section";
import { FeaturesSection } from "@/features/home/components/features-section";
import { CoursesSection } from "@/features/home/components/courses-section";
import { TestimonialsSection } from "@/features/home/components/testimonials-section";
import { RecentBlogsSection } from "@/features/home/components/recent-blogs-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <CoursesSection />
      <TestimonialsSection />
      <RecentBlogsSection />
    </main>
  );
}

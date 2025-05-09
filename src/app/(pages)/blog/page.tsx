import { BlogHero } from "@/features/blog/components/blog-hero";
import { BlogGrid } from "@/features/blog/components/blog-grid";

export const metadata = {
  title: "Blog - Saint Charles K. LTD",
  description:
    "Stay updated with the latest insights about German language learning, cultural events, and student success stories.",
};

export default function BlogPage() {
  return (
    <main className="bg-white">
      <BlogHero />
      <BlogGrid />
    </main>
  );
}

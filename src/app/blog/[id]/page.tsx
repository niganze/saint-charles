import { prisma } from "@/lib/prisma";
import { BlogView } from "@/features/blog/components/blog-view";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

async function getBlog(id: string) {
  const blog = await prisma.blog.findUnique({
    where: { id: parseInt(id) },
  });

  if (!blog || !blog.published) {
    return null;
  }

  return blog;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlog(params.id);

  if (!blog) {
    return {
      title: "Blog Not Found | Saint Charles K. LTD",
      description: "The requested blog post could not be found.",
    };
  }

  const title = `${blog.title} | Saint Charles K. LTD Blog`;
  const description = blog.content.slice(0, 160).replace(/<[^>]*>/g, "");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${blog.id}`,
      images: blog.image ? [{ url: blog.image }] : undefined,
      publishedTime: blog.publishedAt?.toISOString(),
      modifiedTime: blog.updatedAt.toISOString(),
    },
  };
}

export default async function BlogViewPage({ params }: Props) {
  const blog = await getBlog(params.id);

  if (!blog) {
    notFound();
  }

  return (
    <main className="bg-white">
      <BlogView blog={blog} />
    </main>
  );
}

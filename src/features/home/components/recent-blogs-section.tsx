"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string | null;
  publishedAt: string;
}

async function getRecentBlogs(): Promise<Blog[]> {
  const response = await fetch("/api/content");
  const data = await response.json();
  return data.blogs;
}

export function RecentBlogsSection() {
  const { data: blogs = [] } = useQuery({
    queryKey: ["recent-blogs"],
    queryFn: getRecentBlogs,
  });

  if (blogs.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-1/4 top-1/4 w-96 h-96 bg-sc-red/5 rounded-full blur-3xl" />
        <div className="absolute left-1/4 bottom-1/4 w-96 h-96 bg-sc-yellow/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="h-1 w-12 bg-sc-red rounded-full" />
            <span className="text-sc-red font-medium">Latest Updates</span>
            <div className="h-1 w-12 bg-sc-red rounded-full" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Recent Stories & News
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg leading-8 text-gray-600"
          >
            Stay updated with the latest news, success stories, and updates from
            our German language community.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-sc-red/5 flex items-center justify-center">
                    <span className="text-sc-red">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={blog.publishedAt}>
                    {format(new Date(blog.publishedAt), "MMMM d, yyyy")}
                  </time>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 mb-3">
                  {blog.title}
                </h3>

                <Link
                  href={`/blog/${blog.id}`}
                  className="inline-flex items-center gap-2 text-sc-red hover:text-sc-red/80 transition-colors"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sc-red hover:text-sc-red/80 transition-colors text-lg font-medium"
          >
            View All Posts <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { Blog } from "@prisma/client";

interface BlogViewProps {
  blog: Blog;
}

export function BlogView({ blog }: BlogViewProps) {
  return (
    <>
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-100"
      >
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-600 hover:text-sc-red transition-colors flex items-center gap-1"
            >
              <motion.span
                whileHover={{ x: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Home
              </motion.span>
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link
              href="/blog"
              className="text-gray-600 hover:text-sc-red transition-colors flex items-center gap-1"
            >
              <motion.span
                whileHover={{ x: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Blog
              </motion.span>
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-medium text-sc-red line-clamp-1"
            >
              {blog.title}
            </motion.span>
          </div>
        </div>
      </motion.div>

      <article className="relative overflow-hidden bg-white py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-sc-red/5 blur-3xl" />
          <div className="absolute -right-4 bottom-0 h-72 w-72 rounded-full bg-sc-yellow/5 blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Calendar className="h-4 w-4" />
                <time dateTime={blog.publishedAt?.toISOString()}>
                  {blog.publishedAt
                    ? format(new Date(blog.publishedAt), "MMMM d, yyyy")
                    : format(new Date(blog.createdAt), "MMMM d, yyyy")}
                </time>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
                {blog.title}
              </h1>

              {blog.image && (
                <div className="relative aspect-[16/9] mb-12 rounded-2xl overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div
                className="prose prose-lg max-w-none prose-img:rounded-lg prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-sc-red prose-a:no-underline hover:prose-a:text-sc-red/80 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:mt-6 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:mt-6 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:mt-6 [&_h4]:text-xl [&_h4]:font-bold [&_h4]:tracking-tight [&_h4]:mt-6 [&_h5]:text-lg [&_h5]:font-bold [&_h5]:tracking-tight [&_h5]:mt-6 [&_h6]:text-base [&_h6]:font-bold [&_h6]:tracking-tight [&_h6]:mt-6"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </motion.div>
          </div>
        </div>
      </article>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function BlogHero() {
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
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-medium text-sc-red"
            >
              Blog
            </motion.span>
          </div>
        </div>
      </motion.div>

      <section className="relative overflow-hidden bg-white py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-sc-red/5 blur-3xl" />
          <div className="absolute -right-4 bottom-0 h-72 w-72 rounded-full bg-sc-yellow/5 blur-3xl" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <div className="h-1 w-12 bg-sc-red rounded-full" />
              <span className="text-sc-red font-medium">Our Blog</span>
              <div className="h-1 w-12 bg-sc-red rounded-full" />
            </motion.div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Latest News & Articles
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Stay updated with the latest insights about German language
              learning, cultural events, and student success stories.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

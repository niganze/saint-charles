"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  GraduationCap,
  Clock,
  Users,
  Star,
  BookOpen,
} from "lucide-react";
import Image from "next/image";

export function CoursesHero() {
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
              Our Courses
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-1 w-12 bg-sc-red rounded-full" />
                <span className="text-sc-red font-medium">Our Courses</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Comprehensive German Language Programs
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                From beginner to advanced levels, our courses are designed to
                help you achieve fluency in German. Each level is carefully
                structured to build your confidence and competence in speaking,
                reading, writing, and understanding German.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/student-taking-exam.jpeg"
                  alt="Student taking exam"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Floating Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg"
              >
                <BookOpen className="h-8 w-8 text-sc-red" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-lg"
              >
                <GraduationCap className="h-8 w-8 text-sc-yellow" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

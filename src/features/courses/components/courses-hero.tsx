"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, GraduationCap, Clock, Users, Star } from "lucide-react";

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
              <span className="text-sc-red font-medium">
                German Language Courses
              </span>
              <div className="h-1 w-12 bg-sc-red rounded-full" />
            </motion.div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Master German from{" "}
              <span className="text-sc-red">A1 to C2 Level</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our comprehensive German language courses follow the Common
              European Framework of Reference for Languages (CEFR). Choose your
              level and start your journey to fluency.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200/50"
              >
                <div className="p-2 rounded-lg bg-sc-red/10">
                  <GraduationCap className="h-6 w-6 text-sc-red" />
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">6</p>
                <p className="text-lg text-gray-500">Course Levels</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200/50"
              >
                <div className="p-2 rounded-lg bg-sc-yellow/10">
                  <Clock className="h-6 w-6 text-sc-yellow" />
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">1.5</p>
                <p className="text-lg text-gray-500">Months/Level</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200/50"
              >
                <div className="p-2 rounded-lg bg-sc-red/10">
                  <Users className="h-6 w-6 text-sc-red" />
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">15</p>
                <p className="text-lg text-gray-500">Max Students</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col items-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200/50"
              >
                <div className="p-2 rounded-lg bg-sc-yellow/10">
                  <Star className="h-6 w-6 text-sc-yellow" />
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">95%</p>
                <p className="text-lg text-gray-500">Pass Rate</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

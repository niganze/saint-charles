"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, GraduationCap } from "lucide-react";
import Link from "next/link";

const courses = [
  {
    level: "A1",
    name: "Beginner",
    description:
      "Start your journey into German language with basic communication skills.",
    duration: "3 months",
    topics: ["Basic Grammar", "Simple Conversations"],
  },
  {
    level: "A2",
    name: "Elementary",
    description:
      "Build on your basics and learn to handle everyday situations.",
    duration: "3 months",
    topics: ["Past Tense", "Future Plans"],
  },
  {
    level: "B1",
    name: "Intermediate",
    description: "Express yourself more fluently and handle most situations.",
    duration: "4 months",
    topics: ["Complex Grammar", "Work & Career"],
  },
  {
    level: "B2",
    name: "Upper Intermediate",
    description: "Achieve professional working proficiency in German.",
    duration: "4 months",
    topics: ["Business German", "Academic Writing"],
  },
  {
    level: "C1",
    name: "Advanced",
    description: "Master complex topics and express yourself with precision.",
    duration: "6 months",
    topics: ["Advanced Grammar", "Literature"],
  },
  {
    level: "C2",
    name: "Mastery",
    description: "Achieve near-native proficiency in all aspects of German.",
    duration: "6 months",
    topics: ["Creative Writing", "Research"],
  },
];

export function CoursesOverview() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-sc-red/5 blur-3xl" />
        <div className="absolute left-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sc-yellow/5 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-sc-red rounded-full" />
            <span className="text-sc-red font-medium">Our Courses</span>
            <div className="h-1 w-12 bg-sc-red rounded-full" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            German Language Levels
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            From beginner to mastery, our comprehensive courses follow the
            Common European Framework of Reference for Languages (CEFR).
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <motion.div
              key={course.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 rounded-full bg-sc-yellow/10 flex items-center justify-center text-sc-red font-bold">
                  {course.level}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.name}
                </h3>
                <p className="text-gray-600 mb-6">{course.description}</p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-900 font-medium">
                    <span>Key Topics</span>
                  </div>
                  <ul className="space-y-2">
                    {course.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2">
                        <GraduationCap className="h-5 w-5 text-sc-yellow shrink-0 mt-0.5" />
                        <span className="text-gray-600">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

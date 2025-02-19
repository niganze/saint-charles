"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock,
  GraduationCap,
  Users,
} from "lucide-react";
import Link from "next/link";

const courses = [
  {
    level: "A1",
    name: "Beginner",
    description:
      "Start your journey into German language with basic communication skills.",
    duration: "3 months",
    students: "20 per class",
    topics: [
      "Basic Grammar",
      "Simple Conversations",
      "Numbers & Time",
      "Daily Activities",
    ],
  },
  {
    level: "A2",
    name: "Elementary",
    description:
      "Build on your basics and learn to handle everyday situations.",
    duration: "3 months",
    students: "20 per class",
    topics: [
      "Past Tense",
      "Future Plans",
      "Shopping & Services",
      "Travel & Transport",
    ],
  },
  {
    level: "B1",
    name: "Intermediate",
    description: "Express yourself more fluently and handle most situations.",
    duration: "4 months",
    students: "15 per class",
    topics: [
      "Complex Grammar",
      "Work & Career",
      "Culture & Society",
      "Media & Entertainment",
    ],
  },
  {
    level: "B2",
    name: "Upper Intermediate",
    description: "Achieve professional working proficiency in German.",
    duration: "4 months",
    students: "15 per class",
    topics: [
      "Business German",
      "Academic Writing",
      "Current Affairs",
      "Presentations",
    ],
  },
  {
    level: "C1",
    name: "Advanced",
    description: "Master complex topics and express yourself with precision.",
    duration: "6 months",
    students: "12 per class",
    topics: [
      "Advanced Grammar",
      "Literature",
      "Professional Writing",
      "Academic Discourse",
    ],
  },
  {
    level: "C2",
    name: "Mastery",
    description: "Achieve near-native proficiency in all aspects of German.",
    duration: "6 months",
    students: "10 per class",
    topics: [
      "Creative Writing",
      "Research",
      "Cultural Nuances",
      "Specialized Fields",
    ],
  },
];

export function CoursesSection() {
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
            <span className="text-sc-red font-medium">Our Courses</span>
            <div className="h-1 w-12 bg-sc-red rounded-full" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            German Language Levels
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg leading-8 text-gray-600"
          >
            From beginner to mastery, our comprehensive courses follow the
            Common European Framework of Reference for Languages (CEFR).
          </motion.p>
        </div>

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
                  {/* <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-5 w-5 text-sc-red" />
                    <span>{course.students}</span>
                  </div> */}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-900 font-medium">
                    <span>Key Topics</span>
                  </div>
                  <ul className="space-y-2">
                    {course.topics.slice(2).map((topic) => (
                      <li key={topic} className="flex items-start gap-2">
                        <GraduationCap className="h-5 w-5 text-sc-yellow shrink-0 mt-0.5" />
                        <span className="text-gray-600">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link
                    href={`/courses/${course.level.toLowerCase()}`}
                    className="inline-flex items-center gap-2 text-sc-red hover:text-sc-red/80 transition-colors"
                  >
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

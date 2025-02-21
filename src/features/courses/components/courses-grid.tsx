"use client";

import { motion } from "framer-motion";
import { Clock, GraduationCap } from "lucide-react";
import { useEffect } from "react";

const courses = [
  {
    id: "a1",
    level: "A1",
    name: "Beginner",
    description:
      "Start your journey into German language with basic communication skills. Learn to introduce yourself, handle everyday situations, and understand simple conversations.",
    duration: "3 months",
    students: "20 per class",
    topics: [
      "Basic Grammar",
      "Simple Conversations",
      "Numbers & Time",
      "Daily Activities",
      "Basic Vocabulary",
      "Pronunciation",
    ],
    features: [
      "Interactive Learning",
      "Practice Materials",
      "Regular Assessments",
      "Cultural Insights",
    ],
  },
  {
    id: "a2",
    level: "A2",
    name: "Elementary",
    description:
      "Build on your basics and learn to handle everyday situations. Express yourself in familiar contexts and understand frequently used expressions.",
    duration: "3 months",
    students: "20 per class",
    topics: [
      "Past Tense",
      "Future Plans",
      "Shopping & Services",
      "Travel & Transport",
      "Personal Interests",
      "Social Interactions",
    ],
    features: [
      "Conversation Practice",
      "Writing Exercises",
      "Audio Materials",
      "Progress Tracking",
    ],
  },
  {
    id: "b1",
    level: "B1",
    name: "Intermediate",
    description:
      "Express yourself more fluently and handle most situations. Understand main points of complex texts and engage in spontaneous conversation.",
    duration: "4 months",
    students: "15 per class",
    topics: [
      "Complex Grammar",
      "Work & Career",
      "Culture & Society",
      "Media & Entertainment",
      "Abstract Topics",
      "Detailed Descriptions",
    ],
    features: [
      "Group Discussions",
      "Presentation Skills",
      "Cultural Projects",
      "Mock Tests",
    ],
  },
  {
    id: "b2",
    level: "B2",
    name: "Upper Intermediate",
    description:
      "Achieve professional working proficiency in German. Express yourself clearly on a wide range of subjects and understand technical discussions.",
    duration: "4 months",
    students: "15 per class",
    topics: [
      "Business German",
      "Academic Writing",
      "Current Affairs",
      "Presentations",
      "Advanced Grammar",
      "Professional Communication",
    ],
    features: [
      "Business Communication",
      "Academic Writing",
      "Exam Preparation",
      "Career Guidance",
    ],
  },
  {
    id: "c1",
    level: "C1",
    name: "Advanced",
    description:
      "Master complex topics and express yourself with precision. Understand demanding texts and use language flexibly in social, academic, and professional contexts.",
    duration: "6 months",
    students: "12 per class",
    topics: [
      "Advanced Grammar",
      "Literature",
      "Professional Writing",
      "Academic Discourse",
      "Complex Topics",
      "Idiomatic Expressions",
    ],
    features: [
      "Research Projects",
      "Literature Analysis",
      "Advanced Writing",
      "Specialized Vocabulary",
    ],
  },
  {
    id: "c2",
    level: "C2",
    name: "Mastery",
    description:
      "Achieve near-native proficiency in all aspects of German. Understand everything you read or hear and express yourself spontaneously with precision.",
    duration: "6 months",
    students: "10 per class",
    topics: [
      "Creative Writing",
      "Research",
      "Cultural Nuances",
      "Specialized Fields",
      "Advanced Literature",
      "Academic Excellence",
    ],
    features: [
      "Individual Projects",
      "Publication Skills",
      "Academic Research",
      "Professional Development",
    ],
  },
];

export function CoursesGrid() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-1/4 top-1/4 w-96 h-96 bg-sc-red/5 rounded-full blur-3xl" />
        <div className="absolute left-1/4 bottom-1/4 w-96 h-96 bg-sc-yellow/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <motion.div
              key={course.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/50 hover:shadow-lg transition-all"
            >
              <div
                className="absolute -top-28 left-0 w-full h-28"
                id={`${course.id}`}
              />
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 rounded-full bg-sc-yellow/10 flex items-center justify-center text-sc-red font-bold">
                  {course.level}
                </div>
              </div>
              <div className="p-0">
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

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-gray-900 font-medium mb-2">
                      <span>Key Topics</span>
                    </div>
                    <ul className="grid grid-cols-2 gap-2">
                      {course.topics.slice(0, 4).map((topic) => (
                        <li
                          key={topic}
                          className="flex items-start gap-2 text-sm"
                        >
                          <GraduationCap className="h-4 w-4 text-sc-yellow shrink-0 mt-0.5" />
                          <span className="text-gray-600">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-gray-900 font-medium mb-2">
                      <span>Features</span>
                    </div>
                    <ul className="grid grid-cols-2 gap-2">
                      {course.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm"
                        >
                          <GraduationCap className="h-4 w-4 text-sc-yellow shrink-0 mt-0.5" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

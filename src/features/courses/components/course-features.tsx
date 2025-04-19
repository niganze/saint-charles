"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Target,
  GraduationCap,
  Globe,
  Award,
} from "lucide-react";

const features = [
  {
    name: "Expert Teachers",
    description:
      "Learn from qualified native speakers and experienced German language instructors.",
    icon: Users,
    color: "text-sc-red",
    bg: "bg-sc-red/10",
  },
  {
    name: "Small Class Sizes",
    description:
      "Maximum of 20 students per class ensures personalized attention and optimal learning.",
    icon: Target,
    color: "text-sc-yellow",
    bg: "bg-sc-yellow/10",
  },
  {
    name: "Comprehensive Materials",
    description:
      "Access to high-quality textbooks, workbooks, and online learning resources.",
    icon: BookOpen,
    color: "text-sc-red",
    bg: "bg-sc-red/10",
  },
  {
    name: "Cultural Integration",
    description:
      "Learn about German culture, traditions, and customs alongside the language.",
    icon: Globe,
    color: "text-sc-yellow",
    bg: "bg-sc-yellow/10",
  },
  {
    name: "Exam Preparation",
    description:
      "Specialized preparation for all official German language examinations.",
    icon: GraduationCap,
    color: "text-sc-red",
    bg: "bg-sc-red/10",
  },
  {
    name: "Career Support",
    description:
      "Guidance for academic and professional opportunities in German-speaking countries.",
    icon: Award,
    color: "text-sc-yellow",
    bg: "bg-sc-yellow/10",
  },
];

export function CourseFeatures() {
  return (
    <section className="relative overflow-hidden bg-sc-black py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -right-64 top-0 w-[500px] h-[500px] bg-sc-red/5 rounded-full blur-[128px]" />
        <div className="absolute -left-64 bottom-0 w-[500px] h-[500px] bg-sc-yellow/5 rounded-full blur-[128px]" />
        <div className="absolute right-1/3 top-1/3 grid grid-cols-3 gap-1 opacity-20 rotate-12">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-sc-red" />
          ))}
        </div>
        <div className="absolute left-1/4 bottom-1/4 grid grid-cols-3 gap-1 opacity-20 -rotate-12">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-sc-yellow" />
          ))}
        </div>
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
            <span className="text-sc-red font-medium">Why Choose Us</span>
            <div className="h-1 w-12 bg-sc-red rounded-full" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Course Features & Benefits
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Our German language courses are designed to provide you with the
            best learning experience and ensure your success.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm p-8 ring-1 ring-white/10 hover:ring-sc-red/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg}`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.name}
                </h3>
              </div>
              <p className="mt-4 text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

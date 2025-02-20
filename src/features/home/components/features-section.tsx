"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Globe2,
  BookOpen,
  Users,
  Target,
  Award,
  CheckCircle2,
  Clock,
} from "lucide-react";

const features = [
  {
    name: "Free Books Promotion",
    description: "All enrolled students receive free access to course books.",
    icon: BookOpen,
    color: "text-sc-yellow",
    bgColor: "bg-sc-yellow/10",
  },
  {
    name: "Free Exam Preparation",
    description:
      "We prepare our students for success with free exam preparation.",
    icon: Target,
    color: "text-sc-yellow",
    bgColor: "bg-sc-yellow/10",
  },
  {
    name: "Qualified Teachers",
    description:
      "Our team consists of certified and experienced instructors dedicated to your learning success.",
    icon: GraduationCap,
    color: "text-sc-yellow",
    bgColor: "bg-sc-yellow/10",
  },
  {
    name: "Flexible Schedule",
    description:
      "Choose from multiple daily shifts and weekend classes to fit your schedule.",
    icon: Clock,
    color: "text-sc-yellow",
    bgColor: "bg-sc-yellow/10",
  },
];

const levels = [
  { name: "A1", label: "Beginner" },
  { name: "A2", label: "Elementary" },
  { name: "B1", label: "Intermediate" },
  { name: "B2", label: "Upper Intermediate" },
  { name: "C1", label: "Advanced" },
  { name: "C2", label: "Mastery" },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-sc-black text-white relative overflow-hidden">
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
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="h-1 w-12 bg-sc-red rounded-full" />
            <span className="text-sc-red font-medium">Why Choose Us</span>
            <div className="h-1 w-12 bg-sc-red rounded-full" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            What Sets Saint Charles K. LTD Apart
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg leading-8 text-gray-300"
          >
            We provide comprehensive German language education with a focus on
            practical skills and exam preparation.
          </motion.p>
        </div>

        {/* Course Levels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {levels.map((level, index) => (
            <motion.div
              key={level.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full ring-1 ring-white/10 hover:ring-sc-red/20 transition-all group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sc-red/10 group-hover:bg-sc-red/20 transition-colors">
                <span className="text-sm font-bold text-sc-red">
                  {level.name}
                </span>
              </div>
              <span className="font-medium text-gray-300">{level.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative group"
            >
              <div className="absolute inset-0 rounded-3xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 transition-all duration-300 group-hover:ring-sc-red/20 group-hover:-translate-y-1" />
              <div className="relative p-8">
                <div
                  className={`inline-flex rounded-xl ${
                    feature.bgColor
                  } p-3 transition-colors group-hover:${feature.bgColor.replace(
                    "/10",
                    "/20"
                  )}`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {feature.name}
                </h3>
                <p className="mt-2 text-gray-300 leading-6">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Most affordable prices",
              "Free course materials",
              "Expert instructors",
              "Flexible schedules",
              "Exam preparation",
              "Personalized support",
            ].map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex items-center gap-3 text-gray-300 group"
              >
                <CheckCircle2 className="h-5 w-5 text-gray-500 flex-shrink-0 group-hover:text-sc-yellow transition-colors" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

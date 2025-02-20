"use client";

import { motion } from "framer-motion";
import {
  History,
  TrendingUp,
  Users,
  Star,
  Award,
  GraduationCap,
} from "lucide-react";

const milestones = [
  {
    year: "2021",
    title: "Foundation",
    description:
      "Saint Charles K. LTD was founded with the vision of providing comprehensive German language education.",
    icon: History,
    color: "text-sc-red",
    bg: "bg-sc-red/10",
  },
  {
    year: "2022",
    title: "First Graduates",
    description:
      "Our first batch of students successfully completed their courses and moved to Germany.",
    icon: GraduationCap,
    color: "text-sc-yellow",
    bg: "bg-sc-yellow/10",
  },
  {
    year: "2023",
    title: "100+ Success Stories",
    description:
      "More than 100 of our students have successfully traveled to Germany for work, study, and life.",
    icon: Users,
    color: "text-sc-red",
    bg: "bg-sc-red/10",
  },
  {
    year: "2023",
    title: "Excellence Award",
    description:
      "Recognized for outstanding contribution to German language education in Rwanda.",
    icon: Award,
    color: "text-sc-yellow",
    bg: "bg-sc-yellow/10",
  },
  {
    year: "Present",
    title: "Continuous Growth",
    description:
      "We continue to evolve and adapt our programs to meet the changing needs of our students.",
    icon: TrendingUp,
    color: "text-sc-red",
    bg: "bg-sc-red/10",
  },
];

export function JourneySection() {
  return (
    <section className="relative overflow-hidden bg-sc-black py-24 text-white">
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
            <span className="text-sc-red font-medium">Our Journey</span>
            <div className="h-1 w-12 bg-sc-red rounded-full" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Milestones & Achievements
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            From our humble beginnings to where we are today, every milestone
            represents our commitment to excellence in German language
            education.
          </p>
        </motion.div>

        <div className="mt-16 relative">
          {/* Timeline line - hidden on mobile */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-sc-red/50 via-sc-yellow/50 to-sc-red/50 hidden lg:block" />

          <div className="space-y-16 lg:space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className="flex-1 w-full lg:w-auto">
                  <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm p-8 ring-1 ring-white/10 hover:ring-sc-red/20 transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${milestone.bg}`}
                      >
                        <milestone.icon
                          className={`h-6 w-6 ${milestone.color}`}
                        />
                      </div>
                      <div>
                        <span
                          className={`text-sm font-semibold ${milestone.color}`}
                        >
                          {milestone.year}
                        </span>
                        <h3 className="text-lg font-semibold text-white">
                          {milestone.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-300">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Timeline dot - shown on all screens */}
                <div className="relative flex items-center justify-center w-8">
                  <div className="h-4 w-4 rounded-full bg-sc-red ring-4 ring-sc-red/20" />
                </div>

                {/* Empty space for timeline layout */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

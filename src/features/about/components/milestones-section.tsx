"use client";

import { motion } from "framer-motion";
import { History, TrendingUp, Users } from "lucide-react";

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
    year: "2023",
    title: "100+ Success Stories",
    description:
      "More than 100 of our students have successfully traveled to Germany for work, study, and life.",
    icon: Users,
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function MilestonesSection() {
  return (
    <section className="relative overflow-hidden py-24">
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
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Our Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            From our humble beginnings to where we are today, every milestone
            represents our commitment to excellence in German language
            education.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {milestones.map((milestone) => (
            <motion.div
              key={milestone.year}
              variants={item}
              className="group relative overflow-hidden rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200/50 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${milestone.bg}`}
                >
                  <milestone.icon className={`h-6 w-6 ${milestone.color}`} />
                </div>
                <div>
                  <span className={`text-sm font-semibold ${milestone.color}`}>
                    {milestone.year}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {milestone.title}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{milestone.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

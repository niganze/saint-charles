"use client";

import { motion } from "framer-motion";
import { Award, Heart, Scale, Target, Users, BookOpen } from "lucide-react";

const values = [
  {
    icon: Award,
    name: "Excellence & Quality",
    description:
      "We maintain the highest standards in German language education, ensuring every student receives top-quality instruction.",
    color: "text-sc-yellow",
    bg: "bg-sc-yellow/10",
  },
  {
    icon: Users,
    name: "Student Success",
    description:
      "Our dedicated team provides personalized support and guidance to help every student achieve their language learning goals.",
    color: "text-sc-red",
    bg: "bg-sc-red/10",
  },
  {
    icon: Scale,
    name: "Integrity & Trust",
    description:
      "We operate with complete transparency and ethical standards, building lasting relationships with our students.",
    color: "text-sc-yellow",
    bg: "bg-sc-yellow/10",
  },
  {
    icon: Heart,
    name: "Inclusive Community",
    description:
      "We foster a welcoming environment where students from all backgrounds can thrive and learn together.",
    color: "text-sc-red",
    bg: "bg-sc-red/10",
  },
  {
    icon: Target,
    name: "Innovation",
    description:
      "We continuously adapt our teaching methods and incorporate modern learning technologies for better results.",
    color: "text-sc-yellow",
    bg: "bg-sc-yellow/10",
  },
  {
    icon: BookOpen,
    name: "Cultural Bridge",
    description:
      "Beyond language, we help students understand and connect with German culture and traditions.",
    color: "text-sc-red",
    bg: "bg-sc-red/10",
  },
];

export function ValuesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
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
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-sc-yellow rounded-full" />
            <span className="text-sc-yellow font-medium">Our Values</span>
            <div className="h-1 w-12 bg-sc-yellow rounded-full" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Core Values That Define Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            These principles guide our approach to education and shape the
            experience of every student at Saint Charles K. LTD.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${value.bg}`}
                >
                  <value.icon className={`h-6 w-6 ${value.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {value.name}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

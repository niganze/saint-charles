"use client";

import { motion } from "framer-motion";
import { Award, Heart, Scale, Target, Users, BookOpen } from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Award,
    name: "Commitment to Excellence",
    description:
      "We strive for the highest standards in teaching and student success.",
    color: "text-sc-yellow",
    bg: "bg-sc-yellow/10",
  },
  {
    icon: Users,
    name: "Affordability",
    description:
      "Quality education should be accessible to everyone, which is why we offer the most competitive rates.",
    color: "text-sc-red",
    bg: "bg-sc-red/10",
  },
  {
    icon: Scale,
    name: "Student-Centered Approach",
    description:
      "Our students' success is our top priority, and we provide personalized support throughout their learning journey.",
    color: "text-sc-yellow",
    bg: "bg-sc-yellow/10",
  },
  {
    icon: Heart,
    name: "Integrity",
    description:
      "We uphold transparency, professionalism, and ethical conduct in all our interactions.",
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
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src="/students-reading.jpeg"
                alt="Students reading"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-4 left-4 bg-white p-3 rounded-xl shadow-lg"
              >
                <BookOpen className="h-6 w-6 text-sc-yellow" />
              </motion.div>
            </motion.div>
          </motion.div>
          <div className="flex flex-col gap-8 mt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-left"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-1 w-12 bg-sc-red rounded-full" />
                <span className="text-sc-red font-medium">Our Values</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Core Values That <span className="text-sc-red">Define Us</span>
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                We are committed to providing the best possible education and
                support to our students. These principles guide our approach to
                education and shape the experience of every student at Saint
                Charles K. LTD.{" "}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${values[0].bg}`}
                >
                  <Award className={`h-6 w-6 ${values[0].color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Commitment to Excellence
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We strive for the highest standards in teaching and student
                success.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.slice(1, 4).map((value, index) => (
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

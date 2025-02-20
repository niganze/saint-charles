"use client";

import { motion } from "framer-motion";
import { Compass, Eye, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

export function MissionVision() {
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
            <span className="text-sc-red font-medium">Our Purpose</span>
            <div className="h-1 w-12 bg-sc-red rounded-full" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Mission & Vision
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Guided by our commitment to excellence and student success, we
            strive to be the leading German language institution in Rwanda.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm p-8 ring-1 ring-white/10 hover:ring-sc-red/20 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sc-red/10">
                <Target className="h-6 w-6 text-sc-red" />
              </div>
              <h3 className="text-2xl font-semibold">Our Mission</h3>
            </div>
            <p className="text-gray-300 mb-6">
              To provide comprehensive German language education that empowers
              students with the skills and confidence needed for success in
              German-speaking environments.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-sc-red" />
                <span>Quality Language Education</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-sc-red" />
                <span>Cultural Integration</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-sc-red" />
                <span>Career Development</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm p-8 ring-1 ring-white/10 hover:ring-sc-yellow/20 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sc-yellow/10">
                <Eye className="h-6 w-6 text-sc-yellow" />
              </div>
              <h3 className="text-2xl font-semibold">Our Vision</h3>
            </div>
            <p className="text-gray-300 mb-6">
              To be recognized as Rwanda's premier German language institution,
              known for excellence in education and student success in
              international opportunities.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-sc-yellow" />
                <span>Global Recognition</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-sc-yellow" />
                <span>Student Achievement</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-sc-yellow" />
                <span>Educational Innovation</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sc-red hover:text-sc-red/80 transition-colors"
          >
            Start Your Journey <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

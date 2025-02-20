"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, GraduationCap, Users, Clock, Star } from "lucide-react";

export function AboutHero() {
  return (
    <>
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-100"
      >
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-600 hover:text-sc-red transition-colors flex items-center gap-1"
            >
              <motion.span
                whileHover={{ x: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Home
              </motion.span>
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-medium text-sc-red"
            >
              About Us
            </motion.span>
          </div>
        </div>
      </motion.div>

      <section className="relative overflow-hidden bg-white py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-sc-red/5 blur-3xl" />
          <div className="absolute -right-4 bottom-0 h-72 w-72 rounded-full bg-sc-yellow/5 blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="h-1 w-12 bg-sc-red rounded-full" />
                <span className="text-sc-red font-medium">
                  About Saint Charles K. LTD
                </span>
              </motion.div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Empowering Dreams Through{" "}
                <span className="text-sc-red">German Excellence</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Since 2021, we've been more than just a language school. We're a
                gateway to opportunities, helping students master German while
                preparing them for success in Germany. Our commitment to
                excellence and student success has made us Rwanda's premier
                German language institution.
              </p>
              <div className="mt-8 flex gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-sc-red hover:bg-sc-red/90"
                >
                  <Link href="/contact">Register</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/courses">Explore Courses</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-8"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/50 hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sc-red/10">
                  <Users className="h-6 w-6 text-sc-red" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">100+</p>
                <p className="text-gray-600">Success Stories</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/50 hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sc-yellow/10">
                  <GraduationCap className="h-6 w-6 text-sc-yellow" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">6</p>
                <p className="text-gray-600">Course Levels</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/50 hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sc-yellow/10">
                  <Clock className="h-6 w-6 text-sc-yellow" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">95%</p>
                <p className="text-gray-600">Pass Rate</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/50 hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sc-red/10">
                  <Star className="h-6 w-6 text-sc-red" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">4.9</p>
                <p className="text-gray-600">Student Rating</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

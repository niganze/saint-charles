"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  GraduationCap,
  Users,
  Clock,
  Star,
  Lightbulb,
} from "lucide-react";
import Image from "next/image";

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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/student-hapilly-reading.jpeg"
                  alt="Happy student reading"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Stats Boxes */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -bottom-8 -right-8 bg-white p-4 rounded-2xl shadow-lg w-48"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sc-red/10">
                    <Users className="h-5 w-5 text-sc-red" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">100+</p>
                    <p className="text-sm text-gray-600">Students</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute max-md:hidden -top-8 -left-8 bg-white p-4 rounded-2xl shadow-lg w-48"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sc-yellow/10">
                    <Star className="h-5 w-5 text-sc-yellow" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">4.9</p>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-1 w-12 bg-sc-red rounded-full" />
                <span className="text-sc-red font-medium">About Us</span>
              </div>
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
                <Link href="/register">
                  <Button
                    asChild
                    size="lg"
                    className="bg-sc-red hover:bg-sc-red/90"
                  >
                    Register
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button asChild size="lg" variant="outline">
                    Explore Courses
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

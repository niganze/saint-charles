"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Target, Users } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-visible bg-gradient-to-b from-white to-gray-50/50 pt-24 pb-16">
      {/* Background Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-1/4 top-1/4 w-96 h-96 bg-sc-red/10 rounded-full blur-3xl" />
        <div className="absolute left-1/4 bottom-1/4 w-96 h-96 bg-sc-yellow/10 rounded-full blur-3xl" />
        <div className="absolute right-0 top-0 grid grid-cols-3 gap-1 opacity-20">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-sc-red" />
          ))}
        </div>
        <div className="absolute left-1/3 bottom-1/3 grid grid-cols-3 gap-1 opacity-20">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-sc-yellow" />
          ))}
        </div>
      </div>

      <div className="container relative overflow-visible">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="h-1 w-12 bg-sc-red rounded-full" />
              <span className="text-sc-red font-medium">
                Welcome to Saint Charles K.
              </span>
            </motion.div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Master German language{" "}
              <span className="text-sc-red">& Unlock Opportunities!</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We've helped hundreds of students to achieve their goals in German
              language and over hundred of them are now in Germany.
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
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200/50 hover:shadow-md transition-all"
              >
                <div className="p-2 rounded-lg bg-sc-yellow/10">
                  <BookOpen className="h-6 w-6 text-sc-yellow" />
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">A1-C2</p>
                <p className=" text-gray-500">All Levels</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className=" flex flex-col items-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200/50 hover:shadow-md transition-all"
              >
                <div className="p-2 rounded-lg bg-sc-yellow/10">
                  <Users className="h-6 w-6 text-sc-yellow" />
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">100+</p>
                <p className=" text-gray-500">Success Stories</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="max-md:col-span-2 flex flex-col items-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200/50 hover:shadow-md transition-all"
              >
                <div className="p-2 rounded-lg bg-sc-yellow/10">
                  <Target className="h-6 w-6 text-sc-yellow" />
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">95%</p>
                <p className=" text-gray-500">Pass Rate</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:mt-0 overflow-visible p-4"
          >
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-visible">
                <Image
                  src="/hero-image.webp"
                  alt="Student learning German"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Floating Elements */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                  }}
                  className="absolute -right-8 -top-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg p-4"
                >
                  <div className="text-center">
                    <div className="font-bold text-sc-red text-lg">4.9</div>
                    <div className="text-gray-600">Rating</div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                    delay: 1,
                  }}
                  className="absolute -bottom-8 -left-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sc-yellow">6</div>
                    <div className=" text-gray-600">Levels</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
